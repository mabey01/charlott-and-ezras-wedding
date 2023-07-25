import { VisualFormat, VisualQuality } from "../../types/media";
import { createImage, createVariantData } from "./create-image";

function getIdFromImageName(imageName: string) {
  return imageName.replaceAll("/", "-").replaceAll(".", "-");
}

export type StatEntry = {
  imageName: string;
  meta: {
    dateTimeOriginal: string | null;
    resolution: {
      width?: number;
      height?: number;
    };
  };
  formats: string[];
  sizes: string[];
};

export function generateImageSetFromStats(
  getImageSrc: (name: string, quality: string) => string
) {
  return (statEntry: StatEntry) => {
    const { imageName, sizes, meta, formats } = statEntry;
    const id = getIdFromImageName(imageName);
    const dateTaken = meta.dateTimeOriginal
      ? new Date(meta.dateTimeOriginal)
      : undefined;
    const variants = sizes.flatMap((size) =>
      createVariantData(
        getImageSrc(imageName, size),
        size as VisualQuality,
        meta.resolution.width ?? 0,
        meta.resolution.height ?? 0,
        formats as VisualFormat[]
      )
    );
    return createImage(id, imageName, variants, dateTaken);
  };
}
