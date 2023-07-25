import React from "react";
import { BasicImage, BasicImageProps } from "./basic-image";
import {
  MediaContainer,
  MediaContainerProps,
} from "../media-container/media-container";
import { VisualQuality, ImageData } from "../../types/media";
import { getVariantDataByMediaData } from "../../utils/images/get-variant-data";

export interface ImageProps
  extends Omit<BasicImageProps, "src" | "width" | "height" | "formats">,
    Pick<MediaContainerProps, "square"> {
  imageClassName?: string;
  imageData: ImageData;
  quality: VisualQuality;
  inside?: React.ReactNode;
}

export function Image({
  className,
  imageClassName,
  imageData,
  quality,
  square,
  inside,
  ...props
}: ImageProps) {
  const variantData = getVariantDataByMediaData(imageData, quality);

  return (
    <MediaContainer
      square={square}
      resolution={variantData.resolution}
      className={className}
    >
      {inside}
      <BasicImage
        {...props}
        className={imageClassName}
        src={variantData.src}
        width={variantData.resolution.width}
        height={variantData.resolution.height}
        formats={variantData.formats}
      />
    </MediaContainer>
  );
}
