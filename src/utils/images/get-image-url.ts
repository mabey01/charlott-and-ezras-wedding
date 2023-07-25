import {
  ImageData,
  VisualFormat,
  VisualQuality,
  VisualVariantData,
} from "../../types/media";
import { getVariantDataByMediaData } from "./get-variant-data";

export function getImageURLFromVariant(
  variant: VisualVariantData,
  format: VisualFormat
) {
  if (format === "jpeg") return `${variant.src}.jpg`;

  return `${variant.src}.${format}`;
}

export function getImageURL(
  image: ImageData,
  quality: VisualQuality,
  format: VisualFormat
) {
  const variantData = getVariantDataByMediaData(image, quality);
  return getImageURLFromVariant(variantData, format);
}
