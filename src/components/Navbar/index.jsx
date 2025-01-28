import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../modules/users/UserContext";
import "./styles.css";

export const Navbar = () => {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className={`navbar-list ${isLoggedIn ? "logged-in" : ""}`}>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="navbar-link" to="/home">
                Home
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="navbar-link" to="/recipes/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-link" to="/recipes/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-link" to="/recipes/new">
                  New Recipe
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-link" to="/user/settings">
                  My Account
                </Link>
              </li>
              <li className="nav-item">
                <button className="logout-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <div className="enter-item">
              <li className="nav-item">
                <Link className="navbar-link" to="/user/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-link" to="/user/register">
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};