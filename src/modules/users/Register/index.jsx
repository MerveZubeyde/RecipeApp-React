import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataUsers } from "../../../UserData";
import './../../../App.css';

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !email) {
      setError("All fields are required!");
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
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input className="regist-box"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="entry-btn" onClick={handleRegister}>Register</button>
    </div>
  );
};