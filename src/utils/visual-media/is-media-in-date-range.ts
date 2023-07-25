import { VisualMediaData } from "../../types/media";

export type UTCDate = Parameters<typeof Date.UTC>;

export function isMediaInDateRange<T extends VisualMediaData>(
  media: T,
  start?: UTCDate,
  end?: UTCDate
) {
  const startDate = start ? new Date(Date.UTC(...start)) : undefined;
  const endDate = end ? new Date(Date.UTC(...end)) : undefined;

  const dateTaken = media.meta.dateTaken || new Date(0);

  const isBeforeStartDate =
    startDate && dateTaken.getTime() < startDate.getTime();
  const isAfterEndDate = endDate && dateTaken.getTime() > endDate.getTime();

  if (isBeforeStartDate) {
    return false;
  }

  if (isAfterEndDate) {
    return false;
  }

  return true;
}
