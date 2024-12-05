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

  const addFavoriteRecipe = (recipe) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      favoriteRecipes: prevDetails.favoriteRecipes
        ? [...prevDetails.favoriteRecipes, recipe]
        : [recipe],
    }))
  };

  const addMyRecipe = (recipe) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      myRecipes: prevDetails.myRecipes
        ? [...prevDetails.myRecipes, recipe]
        : [recipe],
    }))
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        login,
        logout,
        addFavoriteRecipe,
        addMyRecipe,
      }}>
      {children}
    </UserContext.Provider>
  );
};

