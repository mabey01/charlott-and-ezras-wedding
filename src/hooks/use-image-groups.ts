import { createDateRangeGenerator } from "../utils/visual-media/date-range-generator";
import { useImageContext } from "./use-image-context";

export function useImageGroups() {
  const { allImages } = useImageContext();

  const getImagesBefore = createDateRangeGenerator(allImages);

  return {
    nightBefore: getImagesBefore([2023, 6, 22]),
    morning: getImagesBefore([2023, 6, 22, 13, 30]),
    arrival: getImagesBefore([2023, 6, 22, 14, 20]),
    walk: getImagesBefore([2023, 6, 22, 14, 54]),
    ceremony: getImagesBefore([2023, 6, 22, 16, 54]),
    reception: getImagesBefore(),
  };
}
