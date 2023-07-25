import { useContext } from "react";
import { ImageContext } from "../contexts/image-context";

export function useImageContext() {
  const imageContext = useContext(ImageContext);
  if (!imageContext) {
    throw new Error("ImageContext is missing provider");
  }

  return imageContext;
}
