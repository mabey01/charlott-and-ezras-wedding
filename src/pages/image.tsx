import clsx from "clsx";
import { useRef } from "react";
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
import { useMeasure, usePrevious } from "react-use";

export function ImagePage() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  if (!imageId) {
    throw new Error("ImageId is missing from route");
  }

  const [imageRef, bounds] = useMeasure<HTMLDivElement>();
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

  const preloadingImages = [previousImage, nextImage].filter(
    Boolean
  ) as ImageData[];

  console.log(bounds);

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
    width: bounds.width,
  };

  return (
    <>
      <div className="px-0.5 pb-2 sm:p-2 md:p-4 h-screen flex flex-col gap-4 ">
        <div className="flex-1 overflow-hidden flex flex-col gap-1 lg:p-4">
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
                variants={imageVariants}
                initial="enter"
                animate="idle"
                exit="exit"
                transition={{ type: "spring", stiffness: 400, damping: 29 }}
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
          </div>
          <div className="flex justify-center items-center gap-2">
            <Link
              to="/"
              className="text-neutral-400 flex gap-1.5 items-center hover:bg-neutral-100 rounded px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs">Back to Grid View</span>
            </Link>
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
              <span className="text-xs">Download</span>
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
              <span className="text-xs">Fullscreen</span>
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
