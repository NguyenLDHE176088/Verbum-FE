"use client";
import { createContext, useMemo, useState } from "react";

interface UserData {
  userData: {
    isLogin: boolean;
  };
  changeUserData: (data: any) => void;
}

export const UserContext = createContext<UserData>({
  userData: { isLogin: false },
  changeUserData: (data) => {},
});

export const UserContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [userData, setUserData] = useState({ isLogin: false });

  const changeUserData = useMemo(
    () => (data) => {
      setUserData(data);
    },
    []
  );

  const contextValue = useMemo(
    () => ({ userData, changeUserData }),
    [userData, changeUserData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
