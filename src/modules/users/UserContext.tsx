import { createContext, useState, useContext, ReactNode } from "react";
import { dataUsers } from "./UserData";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  userDetails: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  userDetails: null,
  login: (username: string, password: string) => false,
  logout: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const someUser = dataUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (someUser) {
      setIsLoggedIn(true);
      setUserDetails(someUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
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
