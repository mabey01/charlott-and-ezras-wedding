import { createContext } from "react";
import { ImageData } from "../types/media";

type ImageContext = {
  allImages: ImageData[];
};

export const ImageContext = createContext<ImageContext | undefined>(undefined);
