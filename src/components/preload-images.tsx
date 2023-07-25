import { ImageData, VisualQuality } from "../types/media";
import { Image } from "./visual-media/image";

interface PreloadImagesProps {
  images: ImageData[];
  quality: VisualQuality;
}

export function PreloadImages({ images, quality }: PreloadImagesProps) {
  return (
    <div className="hidden">
      {images.map((image) => (
        <Image key={image.id} imageData={image} quality={quality} />
      ))}
    </div>
  );
}
