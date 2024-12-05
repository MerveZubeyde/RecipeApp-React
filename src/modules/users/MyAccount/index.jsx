import React, { useState } from "react";
import { useUser } from "../../../UserContext";
import "./styles.css";

export const UserSettings = () => {
  const { userDetails } = useUser();
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  if (!userDetails) {
    return <div className="user-settings-container">Please log in to see your settings.</div>;
  }

  const handleEditClick = (field) => {
    setEditingField(field);
    setTempValue(userDetails[field]);
  };

  const handleSaveClick = () => {
    userDetails[editingField] = tempValue;
    setEditingField(null);
  };

  return (
    <div className="container">
    <h1>User Settings</h1>
    <div className="user-settings-container">
      <div className="user-settings-row">
        <label htmlFor="username">Username:</label>
        {editingField === "username" ? (
          <input
            id="username"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <span>{userDetails.username}</span>
        )}
        <button onClick={() => handleEditClick("username")}>Change</button>
      </div>
  
      <div className="user-settings-row">
        <label htmlFor="email">Email:</label>
        {editingField === "email" ? (
          <input
            id="email"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <span>{userDetails.email}</span>
        )}
        <button onClick={() => handleEditClick("email")}>Change</button>
      </div>
  
      <div className="user-settings-row">
        <label htmlFor="password">Password:</label>
        {editingField === "password" ? (
          <input
            id="password"
            type="password"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        ) : (
          <span>********</span>
        )}
        <button onClick={() => handleEditClick("password")}>Change</button>
      </div>
    </div>
  
    {editingField && (
      <button className="button-save" onClick={handleSaveClick}>
        Save
      </button>
    )}
  
    <h3>Favorite Recipes</h3>
    <ul className="userdetails-list">
      {userDetails.favoriteRecipes?.length > 0 ? (
        userDetails.favoriteRecipes.map((recipe) => (
          <li className="userdetails-listitem" key={recipe.idMeal}>{recipe.strMeal}</li>
        ))
      ) : (
        <p>No favorite recipes.</p>
      )}
    </ul>
  
    <h3>My Added Recipes</h3>
    <ul className="userdetails-list">
      {userDetails.addedRecipes?.length > 0 ? (
        userDetails.addedRecipes.map((recipe) => (
          <li className="userdetails-listitem" key={recipe.idMeal}>{recipe.strMeal}</li>
        ))
      ) : (
        <p>No recipes added.</p>
      )}
    </ul>
  </div>
  );
};
