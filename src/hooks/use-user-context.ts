import { useContext } from "react";
import { UserContext } from "../contexts/user-context";

export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext is missing provider");
  }

  return userContext;
}
