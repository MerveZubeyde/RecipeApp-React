import { useUser } from "../../../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate("/recipes");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="entry-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="entry-btn" onClick={handleLogin}>Login</button>
    </div>
  );
};