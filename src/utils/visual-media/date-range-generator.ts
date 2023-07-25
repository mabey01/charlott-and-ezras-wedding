import { VisualMediaData } from "../../types/media";
import { UTCDate, isMediaInDateRange } from "./is-media-in-date-range";

export function createDateRangeGenerator<T extends VisualMediaData>(
  mediaEntries: ReadonlyArray<T>,
  startDate?: UTCDate
) {
  let lastStartDate = startDate;
  return (endDate?: UTCDate) => {
    let currentStartDate = lastStartDate;
    lastStartDate = endDate;

    return mediaEntries.filter((mediaEntry) =>
      isMediaInDateRange(mediaEntry, currentStartDate, endDate)
    );
  };
}
