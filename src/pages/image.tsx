import clsx from "clsx";
import { useRef } from "react";
import { pickMediaById } from "../utils/images/pick-media-by-id";
import { useImageContext } from "../hooks/use-image-context";
import { Image } from "../components/visual-media/image";
import { PreviewImageGallery } from "../components/preview-image-gallery/preview-image-gallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useKeyboardNavigation } from "../hooks/use-keyboard-navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PreloadImages } from "../components/preload-images";
import { ImageData } from "../types/media";
import { ImageLink } from "../components/image-link/image-link";

export function ImagePage() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  if (!imageId) {
    throw new Error("ImageId is missing from route");
  }

  const imageRef = useRef<HTMLDivElement>(null);
  const { allImages } = useImageContext();

  const image = pickMediaById(allImages, imageId);

  const imagesIndex = allImages.indexOf(image);

  const currentImage = allImages.at(imagesIndex)!;
  const previousImage = allImages[imagesIndex - 1];
  const nextImage = allImages.at(imagesIndex + 1);

  const preloadingImages = [previousImage, nextImage].filter(
    Boolean
  ) as ImageData[];

  useKeyboardNavigation(
    () => previousImage && navigate(`/image/${previousImage.id}`),
    () => nextImage && navigate(`/image/${nextImage.id}`)
  );

  const handleRequestFullScreen = () => {
    imageRef.current?.requestFullscreen();
  };

  console.log(currentImage);

  return (
    <>
      <div className="p-0.5 sm:p-2 md:p-4 h-screen flex flex-col gap-4 ">
        <div className="flex-1 overflow-hidden flex flex-col gap-2">
          <div
            ref={imageRef}
            className="relative flex flex-1 justify-center items-center flex-col overflow-hidden"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
          <div className="flex justify-center">
            <button onClick={handleRequestFullScreen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-neutral-400"
              >
                <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 items-center">
          <ImageLink image={previousImage}>
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
            className="flex gap-1 justify-center overflow-hidden"
            images={allImages}
            currentImage={currentImage}
          />
          <ImageLink image={nextImage}>
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
