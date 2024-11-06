import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToBottom from "./ScrollToBottom";
import logo from "./images/Eventify.png";
import logo1 from "./images/Insta.png";
import logo2 from "./images/facebook.png";
import logo3 from "./images/Linkedin.png";
import logo4 from "./images/Twitter.png";
import AboutUs from "./AboutUs";
import Service from "./Service";
import BirthdayPage from "./BirthdayPage";
import WeddingPage from "./WeddingPage";
import CorporatePage from "./CorporatePage";
// import CreateOwnEvent from "./CreateOwnEvent";
import ContactUs from "./ContactUs";
import BookNowPage from "./BookNowPage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import axios from "axios";
import { openDB } from "idb";
import Cookies from "js-cookie"; // Import js-cookie

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle sessionStorage, localStorage and IndexedDB
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const username = urlParams.get("username");

    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUsername =
      localStorage.getItem("username") || sessionStorage.getItem("username");

    if (storedToken && storedUsername) {
      setUser(storedUsername); // Set the user to the stored username
    } else {
      setUser(null); // Optionally handle if no user is logged in
    }

    if (token && username) {
      // Store in both localStorage, sessionStorage, and IndexedDB
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      sessionStorage.setItem("token", token); // Save to sessionStorage
      sessionStorage.setItem("username", username); // Save to sessionStorage
      saveUserToDB(username, token); // Store to IndexedDB
      setUser(username);
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("username", username, { expires: 7 });
      window.history.replaceState(null, null, window.location.pathname); // Clean URL
    }
  }, []);

  // IndexedDB for storing user data
  const initDB = async () => {
    const db = await openDB("EventifyDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "username" }); // Create store for user data with username as key
        }
      },
    });
    return db;
  };

  const saveUserToDB = async (username, token) => {
    const db = await initDB();
    await db.put("users", { username, token }); // Insert or update user data
  };

  const getUserFromDB = async (username) => {
    const db = await initDB();
    const user = await db.get("users", username); // Get user data using username
    return user; // Returns the user data
  };

  const updateUserTokenInDB = async (username, newToken) => {
    const db = await initDB();
    const user = await db.get("users", username); // Get current user
    if (user) {
      user.token = newToken; // Update the token
      await db.put("users", user); // Save the updated user back into IndexedDB
    }
  };

  const deleteUserFromDB = async (username) => {
    const db = await initDB();
    await db.delete("users", username); // Delete user by username
  };

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  const handleLoginSuccess = (username) => {
    setUser(username);
    closeLoginModal();
  };

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    // Clear both localStorage, sessionStorage and IndexedDB
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    Cookies.remove("token");
    Cookies.remove("username");
    deleteUserFromDB(user); // Delete from IndexedDB
  };

  const handleSignup = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone: "123456789",
          address: "Address",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        closeSignupModal();
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Signup failed! Email might already be in use."
        );
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save to both localStorage, sessionStorage, and IndexedDB
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.username);
        saveUserToDB(data.username, data.token); // Store to IndexedDB
        handleLoginSuccess(data.username);
      } else {
        const errorData = await response.json();
        alert(
          errorData.message ||
            "Login failed! Please check your email or password."
        );
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <BrowserRouter>
      <ScrollToBottom />
      <div className="app">
        <header>
          <img src={logo} alt="Event Planner Logo" className="logo" />
          <nav className="nav-center">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/service">Services</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          {user ? (
            <div className="user-dropdown">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                {user} ▼
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="log-button"
              onClick={() =>
                (window.location.href =
                  "http://localhost:5000/api/auth/googlelogin")
              }
            >
              Login
            </button>
          )}
        </header>

        <main>
          <h1>We Plan, You Celebrate</h1>
          <p>- It's That Simple.</p>
          <Link to="/bookings">
            <button className="plan-button">Book Now</button>
          </Link>

          <div className="detail">
            <h2>+91 9820308567</h2>
            <h3>eventify@gmail.com</h3>
          </div>
        </main>

        <footer>
          <div className="logo-container">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo1} alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo2} alt="Facebook" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo3} alt="LinkedIn" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo4} alt="Twitter" />
            </a>
          </div>
        </footer>
      </div>

      <Routes>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/service" element={<Service />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        {/* <Route path="/createevent" element={<CreateOwnEvent />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/bookings" element={<BookNowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
