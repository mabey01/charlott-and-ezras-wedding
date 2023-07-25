import { ComponentProps } from "react";
import { VisualFormat } from "../../types/media";
import { getFormatType } from "../../utils/images/get-format-type";

const FORMAT_ORDER: VisualFormat[] = ["avif", "webp", "jpeg"];

export function bySmallestFormat(formatA: VisualFormat, formatB: VisualFormat) {
  const indexA = FORMAT_ORDER.indexOf(formatA);
  const indexB = FORMAT_ORDER.indexOf(formatB);

  return indexA - indexB;
}

export interface BasicImageProps
  extends Omit<ComponentProps<"img">, "src" | "width" | "height"> {
  src: string;
  width: number;
  height: number;
  formats: VisualFormat[];
}

export function BasicImage({
  className = "",
  src,
  formats,
  ...props
}: BasicImageProps) {
  const sortedFormats = formats.sort(bySmallestFormat);
  return (
    <picture key={src}>
      {sortedFormats.map((format) => (
        <source
          key={format}
          srcSet={`${src}.${format}`}
          type={getFormatType(format)}
        />
      ))}
      <img
        {...props}
        src={`${src}.${[...sortedFormats].pop()}`}
        className={`${className} bg-neutral-200 block w-full h-full object-cover`}
      />
    </picture>
  );
}
