import fsPromises from "fs/promises";
import path from "path";
import {
  StatEntry,
  generateImageSetFromStats,
} from "./images/create-images-from-stats";
import { BASE_MEDIA_URL } from "@/config";
import { sortByDateTaken } from "./images/sort-by-date-taken";
import { cache } from "react";
import { createDateRangeGenerator } from "./visual-media/date-range-generator";
import { verifyImages } from "./images/verify-images";

const createImageHelper = generateImageSetFromStats(
  (name, quality) => `${BASE_MEDIA_URL}/images/${quality}/${name}_${quality}`
);

const FORMATS = ["webp", "avif", "jpeg"];

function entryIsValid(entry: StatEntry) {
  return FORMATS.every(
    (requiredFormat) => entry.formats.indexOf(requiredFormat) >= 0
  );
}

export const fetchAllImages = cache(async () => {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "json/generated-images.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath, "utf-8");
  // Parse data as json
  const objectData = JSON.parse(jsonData) as StatEntry[];

  console.log("Contains all formats: ", objectData.every(entryIsValid));

  const allImages = [...sortByDateTaken(objectData)].map(createImageHelper);

  console.log("Verify all images", verifyImages(allImages));

  return allImages;
});

export const fetchImageGroups = cache(async () => {
  const allImages = await fetchAllImages();
  const getImagesBefore = createDateRangeGenerator(allImages);

  return {
    nightBefore: getImagesBefore([2023, 6, 22]),
    morning: getImagesBefore([2023, 6, 22, 13, 30]),
    arrival: getImagesBefore([2023, 6, 22, 14, 20]),
    walk: getImagesBefore([2023, 6, 22, 14, 54]),
    ceremony: getImagesBefore([2023, 6, 22, 16, 54]),
    reception: getImagesBefore(),
  };
});

export const fetchImageGroupById = cache(async (mediaId: string) => {
  const imageGroups = await fetchImageGroups();

  const imageGroup = Object.values(imageGroups).find((imageGroup) =>
    imageGroup.find((image) => image.id === mediaId)
  );

  if (!imageGroup)
    throw new Error("Image with id, is not included in any group");

  return imageGroup;
});
