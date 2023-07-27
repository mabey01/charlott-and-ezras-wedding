import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseContext } from "./use-supabase-provider";
import { useUniqueUserId } from "./use-unique-user-id";
import { ImageStats, getImageStatsQueryKey } from "../utils/image-stats";

export function useUnlikeImage(imageId: string) {
  const uniqueUserID = useUniqueUserId();
  const { client } = useSupabaseContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      queryClient.setQueryData<ImageStats>(
        getImageStatsQueryKey(imageId),
        (oldStats) => {
          if (!oldStats) return;
          return {
            likes: oldStats.likes - 1,
            localUserHasLiked: false,
          };
        }
      );

      await client
        .from("Likes")
        .delete()
        .eq("unique_user_id", uniqueUserID)
        .eq("photo_id", imageId)
        .throwOnError();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getImageStatsQueryKey(imageId),
      });
    },
  });
}
