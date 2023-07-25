import { ReactNode } from "react";
import { ImageData } from "../../types/media";
import { Link } from "react-router-dom";

interface ImageLinkProps {
  image?: ImageData;
  children: ReactNode;
}

export function ImageLink({ image, children }: ImageLinkProps) {
  if (!image) {
    return <div>{children}</div>;
  }

  return <Link to={`/image/${image.id}`}>{children}</Link>;
}
