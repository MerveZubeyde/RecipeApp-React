import { useState } from "react";
import { useUser } from "../UserContext";
import "./styles.css";

interface UserFormData {
  username: string;
  email: string;
  password: string;
  addedRecipes: { idMeal: string; strMeal: string }[];
}

export const UserSettings = () => {
  const { userDetails } = useUser();
  const [editingField, setEditingField] = useState<keyof UserFormData | null>(
    null
  );
  const [tempValue, setTempValue] = useState("");

  if (!userDetails || !userDetails.addedRecipes) {
    return <div className="user-settings-container">No recipes added.</div>;
  }

  const handleEditClick = (field: keyof UserFormData) => {
    setEditingField(field);
    setTempValue((userDetails as UserFormData)[field] as string);
  };

  const handleSaveClick = () => {
    if (tempValue.trim() !== "") {
      if (
        editingField === "username" ||
        editingField === "email" ||
        editingField === "password"
      ) {
        (userDetails as UserFormData)[editingField] = tempValue;
      }
    }
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

      <h3>My Added Recipes</h3>
      <ul className="userdetails-list">
        {userDetails.addedRecipes?.length > 0 ? (
          userDetails.addedRecipes.map(
            (recipe: { idMeal: string; strMeal: string }) => (
              <li className="userdetails-listitem" key={recipe.idMeal}>
                {recipe.strMeal}
              </li>
            )
          )
        ) : (
          <p>No recipes added.</p>
        )}
      </ul>
    </div>
  );
};
