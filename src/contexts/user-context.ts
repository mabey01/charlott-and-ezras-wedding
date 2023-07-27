import { createContext } from "react";

type UserContext = {
  uniqueUserID: string;
};

export const UserContext = createContext<UserContext | undefined>(undefined);
