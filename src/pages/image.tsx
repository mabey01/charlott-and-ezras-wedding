import clsx from "clsx";
import { pickMediaById } from "../utils/images/pick-media-by-id";
import { useImageContext } from "../hooks/use-image-context";
import { Image } from "../components/visual-media/image";
import { PreviewImageGallery } from "../components/preview-image-gallery/preview-image-gallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useKeyboardNavigation } from "../hooks/use-keyboard-navigation";
import { PreloadImages } from "../components/preload-images";
import { ImageData } from "../types/media";
import { ImageLink } from "../components/image-link/image-link";
import { getImageURL } from "../utils/images/get-image-url";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useMeasure, usePrevious } from "@react-hookz/web";
import { useLikeImage } from "../hooks/use-like-image";
import { useImageStats } from "../hooks/use-image-stats";
import { useLikedAnimation } from "../hooks/use-liked-animation";
import { useUnlikeImage } from "../hooks/use-unlike-image";
import { useCallback } from "react";
import { Translate } from "../components/translate/translate";

export default function ImagePage() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  if (!imageId) {
    throw new Error("ImageId is missing from route");
  }

  const [bounds, imageRef] = useMeasure<HTMLDivElement>();
  const { allImages } = useImageContext();

  const image = pickMediaById(allImages, imageId);

  const imageIndex = allImages.indexOf(image);
  const previousImageIndex = usePrevious(imageIndex);
  const direction =
    previousImageIndex === undefined
      ? 0
      : imageIndex > previousImageIndex
      ? 1
      : -1;

  const currentImage = allImages.at(imageIndex)!;
  const previousImage = allImages[imageIndex - 1];
  const nextImage = allImages.at(imageIndex + 1);

  const { data: stats, isLoading } = useImageStats(currentImage.id);
  const { mutateAsync: likeImage } = useLikeImage(currentImage.id);
  const { mutateAsync: unlikeImage } = useUnlikeImage(currentImage.id);
  const { controls, play } = useLikedAnimation();
  const preloadingImages = [previousImage, nextImage].filter(
    Boolean
  ) as ImageData[];

  const navigateToPrevious = () => {
    previousImage && navigate(`/image/${previousImage.id}`);
  };

  const navigateToNext = () => {
    nextImage && navigate(`/image/${nextImage.id}`);
  };

  useKeyboardNavigation(navigateToPrevious, navigateToNext);

  const handleRequestFullScreen = () => {
    imageRef.current?.requestFullscreen();
  };

  const custom: ImageVariantsCustom = {
    direction,
    width: bounds?.width || 100,
  };

  const likeImageWithAnimation = useCallback(() => {
    likeImage();
    play();
  }, [likeImage, play]);

  console.log(currentImage);

  return (
    <>
      <div className="px-0.5 py-2 sm:p-2 md:p-4 h-screen flex flex-col gap-4 ">
        <div>
          <Link
            to={`/?image=${image.id}`}
            className="flex gap-1 items-center text-neutral-600 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-neutral-400"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
            <span className="group-hover:text-neutral-800 text-sm">
              <Translate k="image.backToGrid" />
            </span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-1 lg:p-4">
          <div
            ref={imageRef}
            className="relative flex flex-1 justify-center items-center flex-col overflow-hidden"
          >
            <AnimatePresence custom={custom}>
              <motion.div
                key={image.id}
                custom={custom}
                drag="x"
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.2}
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  if (info.velocity.x > 20) {
                    navigateToPrevious();
                    return;
                  }

                  if (info.velocity.x < -20) {
                    navigateToNext();
                    return;
                  }
                }}
                onDoubleClick={() => likeImageWithAnimation()}
                variants={imageVariants}
                initial="enter"
                animate="idle"
                exit="exit"
                transition={{
                  duration: 0.2,
                }}
                className="absolute inset-0 flex flex-col justify-center items-center"
              >
                <Image
                  imageData={image}
                  quality="2560"
                  imageClassName="rounded-xl"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 grid place-content-center pointer-events-none">
              <motion.svg
                key={image.id}
                initial={{ opacity: 0 }}
                animate={controls}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-red-400 drop-shadow"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </motion.svg>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() =>
                stats?.localUserHasLiked
                  ? unlikeImage()
                  : likeImageWithAnimation()
              }
              className={clsx(
                "flex gap-1 items-center hover:bg-neutral-100 rounded px-2 py-1",
                {
                  ["text-neutral-400"]: !stats?.localUserHasLiked,
                  ["text-red-400"]: stats?.localUserHasLiked,
                }
              )}
            >
              {!isLoading && <span className="text-xs">{stats?.likes}</span>}
              {isLoading && <span className="text-xs">0</span>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mt-[1px]"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </button>
            <a
              download={image.meta.name}
              href={getImageURL(image, "2560", "jpeg")}
              className="text-neutral-400 flex gap-1.5 items-center hover:bg-neutral-100 rounded px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
              <span className="text-xs">
                <Translate k="image.download" />
              </span>
            </a>
            <button
              onClick={handleRequestFullScreen}
              className="text-neutral-400 flex gap-1.5 items-center hover:bg-neutral-100 rounded px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z" />
              </svg>
              <span className="text-xs">
                <Translate k="image.fullscreen" />
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 items-center">
          <ImageLink image={previousImage} className="h-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={clsx("w-6 h-6 text-neutral-400", {
                ["opacity-25"]: !previousImage,
              })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </ImageLink>
          <PreviewImageGallery
            className="flex gap-1 justify-center overflow-hidden w-80"
            images={allImages}
            currentImage={currentImage}
          />
          <ImageLink image={nextImage} className="h-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={clsx("w-6 h-6 text-neutral-400", {
                ["opacity-25"]: !nextImage,
              })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </ImageLink>
        </div>
      </div>
      <PreloadImages images={preloadingImages} quality="2560" />
    </>
  );
}

type ImageVariantsCustom = {
  direction: number;
  width: number;
};

const imageVariants: Variants = {
  enter: ({ direction, width }: ImageVariantsCustom) => ({
    x: direction * width,
  }),
  idle: { x: 0 },
  exit: ({ direction, width }: ImageVariantsCustom) => ({
    x: direction * width * -1,
  }),
};
