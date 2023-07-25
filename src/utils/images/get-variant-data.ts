import {
  VisualMediaData,
  Resolution,
  VisualVariantData,
  VisualQuality,
} from "../../types/media";

export function getVariantData(
  variants: VisualVariantData[],
  quality: VisualQuality
): VisualVariantData {
  const variantData = variants.find((preview) => preview.quality === quality);

  if (!variantData) {
    console.info(`could not find variant with quality ${quality}`, variants);
  }

  return variantData ?? variants[0];
}

export function getVariantDataByMediaData(
  mediaData: VisualMediaData,
  quality: VisualQuality
): VisualVariantData {
  if (mediaData.type === "video")
    return getVariantData(mediaData.videos, quality);

  return getVariantData(mediaData.images, quality);
}

export function getResolution(
  mediaData: VisualMediaData,
  quality: VisualQuality
): Resolution {
  return getVariantDataByMediaData(mediaData, quality).resolution;
}
