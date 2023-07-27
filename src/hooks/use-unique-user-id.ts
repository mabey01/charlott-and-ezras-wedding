import { useUserContext } from "./use-user-context";

export function useUniqueUserId() {
  return useUserContext().uniqueUserID;
}
