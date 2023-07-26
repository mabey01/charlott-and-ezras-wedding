import { ComponentProps, useState } from "react";
import { VisualFormat } from "../../types/media";
import { getFormatType } from "../../utils/images/get-format-type";
import { Tooltip } from "../tooltip/tooltip";

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
  const [isBroken, setIsBroken] = useState(false);
  const sortedFormats = formats.sort(bySmallestFormat);

  if (isBroken) {
    return (
      <Tooltip.Root>
        <Tooltip.Trigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </Tooltip.Trigger>
        <Tooltip.Content>This image could not be loaded</Tooltip.Content>
      </Tooltip.Root>
    );
  }

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
        onError={(e) => {
          console.log(e);
          setIsBroken(true);
        }}
      />
    </picture>
  );
}
