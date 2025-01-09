import { createContext, useState, useContext } from "react";
import { dataUsers } from "./UserData";


const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const login = (username, password) => {
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
      }}>
      {children}
    </UserContext.Provider>
  );
};
