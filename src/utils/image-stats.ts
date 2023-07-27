export type ImageStats = {
  likes: number;
  localUserHasLiked: boolean;
};

export function getImageStatsQueryKey(imageId: string) {
  return ["image", imageId, "stats"];
}
