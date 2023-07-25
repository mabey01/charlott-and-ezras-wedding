import { ImageData, VisualFormat } from "../../types/media";

const REQUIRED_FORMATS: VisualFormat[] = ["webp", "avif", "jpeg"];

export function imageIsVerified(entry: ImageData) {
  return entry.images.every((variant) => {
    return REQUIRED_FORMATS.every(
      (requiredFormat) => variant.formats.indexOf(requiredFormat) >= 0
    );
  });
}

export function verifyImages(images: ImageData[]) {
  return images.every(imageIsVerified);
}
