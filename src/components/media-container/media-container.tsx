import { ComponentProps } from "react";
import { Resolution } from "../../types/media";

const SIZES = {
  s: "w-full sm:w-[200px]",
  m: "w-full sm:w-[400px]",
  l: "w-full sm:w-[640px]",
  full: "w-full",
  auto: "",
} as const;

export type MediaSize = keyof typeof SIZES;

function getAspectRatio({ width, height }: Resolution, isSquare: boolean) {
  if (isSquare) return "1/1";
  return `${width} / ${height}`;
}

export interface MediaContainerProps extends ComponentProps<"div"> {
  resolution: Resolution;
  square?: boolean;
  size?: MediaSize;
}

export function MediaContainer({
  className,
  resolution,
  size,
  square = false,
  children,
  ...props
}: MediaContainerProps) {
  return (
    <div
      {...props}
      className={`${className} ${
        SIZES[size || "auto"]
      } relative group overflow-hidden flex justify-center items-center`}
      style={{ aspectRatio: getAspectRatio(resolution, square) }}
    >
      {children}
    </div>
  );
}
