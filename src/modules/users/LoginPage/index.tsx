import { useUser } from "../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    username: "",
    password: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const errors = { username: "", password: "" };

    if (username.trim() === "") {
      errors.username = "Username is required.";
      isValid = false;
    }
    if (password.trim() === "") {
      errors.password = "Password is required.";
      isValid = false;
    }
    setValidationError(errors);
    return isValid;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate("/recipes");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="entry-container">
      <form className="entry-form" onSubmit={handleLogin} noValidate>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationError.username && (
            <p className="error-message">{validationError.username}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationError.password && (
            <p className="error-message">{validationError.password}</p>
          )}
        </div>
        {error && <p>{error}</p>}
        <button className="entry-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
