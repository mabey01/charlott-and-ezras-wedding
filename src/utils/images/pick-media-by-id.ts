import { AnyMedia } from "../../types/media";

function byId(id: string) {
  return (media: AnyMedia) => {
    return media.id === id;
  };
}

export function pickMediaById<T extends AnyMedia>(
  media: ReadonlyArray<T>,
  id: string
) {
  const foundEntry = media.find(byId(id));

  if (!foundEntry) throw new Error(`Could not find media with id ${name}`);

  return foundEntry;
}
