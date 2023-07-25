import { BASE_MEDIA_URL } from "@/config";
import { generateImageSetFromStats } from "../images/create-images-from-stats";
import { sortByDateTaken } from "../images/sort-by-date-taken";

import uploadedMedia from "./generated-images.json";

const createImageHelper = generateImageSetFromStats(
  (name, quality) => `${BASE_MEDIA_URL}/images/${quality}/${name}_${quality}`
);

export function getMedia() {
  return [...sortByDateTaken(uploadedMedia)].map(createImageHelper);
}
