"use client";
import React, { createContext, useMemo } from "react";

interface UserData {
  isLogin: boolean;
  isHasCompany: boolean;
}

interface UserContextType {
  userData: UserData;
  changeUserData: (data: Partial<UserData>) => void;
}

export const UserContext = createContext<UserContextType>({
  userData: { isLogin: false, isHasCompany: false },
  changeUserData: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = React.useState<UserData>({
    isLogin: false,
    isHasCompany: false,
  });

  const changeUserData = useMemo(
    () => (data: Partial<UserData>) => {
      console.log('Updating userData:', data); // Log state updates
      setUserData((prevUserData) => {
        const newUserData = { ...prevUserData, ...data };
        console.log('New userData state:', newUserData); // Log new state
        return newUserData;
      });
    },
    []
  );
  

  const contextValue = useMemo(
    () => ({
      userData,
      changeUserData,
    }),
    [userData]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
