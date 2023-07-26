import { ReactNode } from "react";
import { ImageData } from "../../types/media";
import { Link } from "react-router-dom";

interface ImageLinkProps {
  className?: string;
  image?: ImageData;
  children: ReactNode;
}

export function ImageLink({ image, children, ...props }: ImageLinkProps) {
  if (!image) {
    return <div {...props}>{children}</div>;
  }

  return (
    <Link {...props} to={`/image/${image.id}`}>
      {children}
    </Link>
  );
}
