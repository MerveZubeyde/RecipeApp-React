import React, { createContext, useState, useContext, ReactNode } from "react";
import { dataUsers } from "./UserData";
import { UserContextData } from "./interfaces";


interface UserContextType {
  isLoggedIn: boolean;
  userDetails: UserContextData | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const defaultContextValue: UserContextType = {
  isLoggedIn: false,
  userDetails: null,
  login: () => false,
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUser = (): UserContextType => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserContextData | null>(null);

  const login = (username: string, password: string): boolean => {
    const someUser = dataUsers.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );

    if (someUser) {
      setIsLoggedIn(true);
      setUserDetails(someUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
