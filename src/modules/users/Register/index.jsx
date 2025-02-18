import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataUsers } from "../UserData";
import './../../../App.css';

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationError, setValidationError] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    const errors = { username: "", email: "", password: "" };

    if (username.trim() === "") {
      errors.username = "Username is required.";
      isValid = false;
    }
    if (email.trim() === "") {
      errors.email = "Email is required.";
      isValid = false;
    }
    if (password.trim() === "") {
      errors.password = "Password is required.";
      isValid = false;
    }
    setValidationError(errors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const userExists = dataUsers.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      setError("User with this username or email already exists!");
      return;
    }

    dataUsers.push({ username, password, email });
    setSuccess("Registration successful! Redirecting to login...");
    setError("");

    setTimeout(() => {
      navigate("/user/login");
    }, 2000);
  };

  return (
    <div className="entry-container">
      <form className="entry-form" onSubmit={handleRegister} noValidate>
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p>{success}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationError.username && <p className="error-message">{validationError.username}</p>}
        </div>
        <div className="form-group" >
          <label  htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationError.email && <p className="error-message">{validationError.email}</p>}
        </div>
        <div className="form-group" >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationError.password && <p className="error-message">{validationError.password}</p>}
        </div>
        <button className="entry-btn" type="submit">Register</button>
      </form>
    </div>
  );
};
