import { Image } from "../visual-media/image";
import { ComponentProps, useRef } from "react";
import clsx from "clsx";
import { ImageData } from "../../types/media";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const NUMBER_OF_PREVIEW_IMAGES = 7;

function getPreviewImages(images: ImageData[], currentIndex: number) {
  const startIndex = currentIndex - (NUMBER_OF_PREVIEW_IMAGES - 1) / 2;

  if (startIndex < 0) {
    return images.slice(0, NUMBER_OF_PREVIEW_IMAGES);
  }

  const endIndex = currentIndex + NUMBER_OF_PREVIEW_IMAGES / 2;
  if (endIndex > images.length) {
    return images.slice(images.length - NUMBER_OF_PREVIEW_IMAGES);
  }

  return images.slice(startIndex, endIndex + 1);
}

interface PreviewImageGalleryProps extends ComponentProps<"ol"> {
  images: ImageData[];
  currentImage: ImageData;
}

export function PreviewImageGallery({
  images,
  currentImage,
  ...props
}: PreviewImageGalleryProps) {
  const ref = useRef<HTMLOListElement>(null);

  const currentImageIndex = images.findIndex(
    (image) => image.id === currentImage.id
  );

  const imagesSlice = getPreviewImages(images, currentImageIndex);

  return (
    <ol ref={ref} {...props}>
      {imagesSlice.map((image) => (
        <li key={image.id}>
          <Link to={`/image/${image.id}`}>
            <Image
              imageData={image}
              quality="80sq"
              className={clsx("h-12 rounded-sm", {
                ["opacity-100"]: image.id === currentImage.id,
                ["opacity-50"]: image.id !== currentImage.id,
              })}
              square
              alt={image.meta.name}
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
