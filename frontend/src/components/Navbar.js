import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {ThemeContext} from "../context/ThemeContext";
import "../styles/Navbar.css"; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    // Apply the theme to the <body> tag when the component mounts
    useEffect(() => {
        document.body.classList.toggle("dark-mode", theme === "dark");
    }, [theme]);

    return (
        <nav className={`navbar ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/contests">Contests</Link>
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        <span>Welcome,{user.username} </span>
                        <button className="logout-btn" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/register" className="register-btn">Register</Link>
                    </>
                )}

                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
