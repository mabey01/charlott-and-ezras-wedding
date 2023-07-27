import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseContext } from "./use-supabase-provider";
import { useUniqueUserId } from "./use-unique-user-id";
import { ImageStats, getImageStatsQueryKey } from "../utils/image-stats";

export function useLikeImage(imageId: string) {
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
            likes: oldStats.likes + 1,
            localUserHasLiked: true,
          };
        }
      );

      await client
        .from("Likes")
        .insert({ unique_user_id: uniqueUserID, photo_id: imageId })
        .throwOnError();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getImageStatsQueryKey(imageId),
      });
    },
  });
}
