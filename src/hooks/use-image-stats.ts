import { useQuery } from "@tanstack/react-query";
import { useSupabaseContext } from "./use-supabase-provider";
import { useUniqueUserId } from "./use-unique-user-id";
import { ImageStats, getImageStatsQueryKey } from "../utils/image-stats";

export function useImageStats(imageId: string) {
  const uniqueUserId = useUniqueUserId();
  const { client } = useSupabaseContext();
  return useQuery(
    getImageStatsQueryKey(imageId),
    async (): Promise<ImageStats> => {
      const { data } = await client
        .from("Likes")
        .select("*")
        .eq("photo_id", imageId)
        .throwOnError();

      const localUserHasLiked = data
        ? data.some((entry) => entry.unique_user_id === uniqueUserId)
        : false;
      return {
        likes: data!.length,
        localUserHasLiked,
      };
    }
  );
}
