import { StatEntry } from "./create-images-from-stats";

function byDateTakenASC(entryA: StatEntry, entryB: StatEntry) {
  return (
    new Date(entryA.meta.dateTimeOriginal || 0).getTime() -
    new Date(entryB.meta.dateTimeOriginal || 0).getTime()
  );
}

export function sortByDateTaken(imageDescriptions: StatEntry[]) {
  return [...imageDescriptions].sort(byDateTakenASC);
}
