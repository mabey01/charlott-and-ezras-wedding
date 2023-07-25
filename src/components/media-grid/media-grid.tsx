import { ComponentProps } from "react";
import clsx from "clsx";
import { Image } from "../visual-media/image";
import { ImageData } from "../../types/media";
import { Link } from "react-router-dom";

interface MediaGridProps extends ComponentProps<"ol"> {
  media: ImageData[];
}

export function MediaGrid({ media, className, ...props }: MediaGridProps) {
  return (
    <ol
      {...props}
      className={clsx(
        className,
        "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
      )}
    >
      {media.map((image) => (
        <li key={image.id}>
          <Link
            to={`/image/${image.id}`}
            className="group block relative overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-pink-400 focus-visible:outline-offset-2"
          >
            <Image
              imageData={image}
              className="w-full group-hover:scale-110 transition-transform"
              quality="640sq"
              loading="lazy"
              square
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
