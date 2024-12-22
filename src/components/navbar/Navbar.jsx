import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../images/logo/9.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/loginSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.login.isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    // Close menu if user clicks outside of the menu
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>
          <Link to="/" className={styles.homeButton}>
            <img src={logo} alt="TalkTown Logo" />
          </Link>
        </h2>
        <button
          className={styles.hamburgerBtn}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M3 12h18M3 6h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <ul className={`${styles.links} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link to="/landingPage" className={styles.homeButton}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/countdown" className={styles.countdownTimer}>
              Countdown New Year
            </Link>
          </li>
          <li>
            <Link to="/games" className={styles.games}>
              Games
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/profile" className={styles.profileButton}>
                Profile
              </Link>
            </li>
          )}
          {!isAuthenticated ? (
            <li>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/logout"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
