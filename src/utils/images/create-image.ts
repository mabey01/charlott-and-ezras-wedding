import {
  VisualVariantData,
  VisualFormat,
  Orientations,
  ImageData,
} from "../../types/media";

export function createVariantData(
  src: string,
  quality: VisualVariantData["quality"],
  width: number,
  height: number,
  formats: VisualFormat[]
): VisualVariantData {
  if (!formats.length) {
    throw new Error("provided formats is empty");
  }
  return {
    src,
    quality,
    resolution: {
      width,
      height,
    },
    formats,
  };
}

export function createImage(
  id: string,
  name: string,
  variants: VisualVariantData[],
  dateTaken?: Date
): ImageData {
  return {
    type: "image",
    id,
    images: variants,
    meta: {
      name,
      dateTaken,
    },
  };
}

export function createImageSet<K extends string>(
  getImageSrc: (name: string, quality: string) => string,
  qualities: VisualVariantData["quality"][],
  orientations: Orientations<K>
) {
  return (
    imageName: string,
    orientation: K | "custom",
    width?: number,
    height?: number
  ) => {
    let imageWidth = NaN;
    let imageHeight = NaN;
    if (orientation === "custom") {
      imageWidth = width!;
      imageHeight = height!;
    } else {
      imageWidth = orientations[orientation].width;
      imageHeight = orientations[orientation].height;
    }
    const id = getImageSrc(imageName, "");
    const variants = qualities.map((quality) =>
      createVariantData(
        getImageSrc(imageName, quality),
        quality,
        imageWidth,
        imageHeight,
        ["webp"]
      )
    );
    return createImage(id, imageName, variants, new Date());
  };
}
