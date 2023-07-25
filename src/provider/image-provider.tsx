import { ReactNode, useMemo } from "react";
import { ImageContext } from "../contexts/image-context";

import generatedImages from "../json/generated-images.json";
import { sortByDateTaken } from "../utils/images/sort-by-date-taken";
import { generateImageSetFromStats } from "../utils/images/create-images-from-stats";
import { BASE_MEDIA_URL } from "../config";

export function ImageProvider({ children }: { children: ReactNode }) {
  const allImages = useMemo(() => {
    const createImageHelper = generateImageSetFromStats(
      (name, quality) =>
        `${BASE_MEDIA_URL}/images/${quality}/${name}_${quality}`
    );

    return [...sortByDateTaken(generatedImages)].map(createImageHelper);
  }, []);

  return (
    <ImageContext.Provider value={{ allImages }}>
      {children}
    </ImageContext.Provider>
  );
}
