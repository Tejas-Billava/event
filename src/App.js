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
import CreateOwnEvent from "./CreateOwnEvent";
import ContactUs from "./ContactUs";
import BookNowPage from "./BookNowPage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser(username);
    }
  }, []);

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
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
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
                <div className="dropdown-menu ">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="log-button" onClick={openLoginModal}>
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
          {!user && (
            <button className="plan-button" onClick={openSignupModal}>
              Sign Up
            </button>
          )}
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/birthday" element={<BirthdayPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
        <Route path="/createownevent" element={<CreateOwnEvent />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/bookings" element={<BookNowPage />} />
      </Routes>

      {isLoginOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeLoginModal}>
              &times;
            </span>
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(e.target.email.value, e.target.password.value);
              }}
            >
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="email" required />
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                name="password"
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {isSignupOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeSignupModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup(
                  e.target.signupUsername.value,
                  e.target.signupEmail.value,
                  e.target.signupPassword.value
                );
              }}
            >
              <label htmlFor="signup-username">Name:</label>
              <input
                type="text"
                id="signup-username"
                name="signupUsername"
                required
              />
              <label htmlFor="signup-email">Email:</label>
              <input
                type="email"
                id="signup-email"
                name="signupEmail"
                required
              />
              <label htmlFor="signup-password">Password:</label>
              <input
                type="password"
                id="signup-password"
                name="signupPassword"
                required
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
