import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './navbar.module.css'; // Importējam CSS moduli
import logo from "../../images/logo/9.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/loginSlice"; // Importējam logout funkciju

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stāvoklis, lai kontrolētu izvēlni
  const dispatch = useDispatch(); // Redux dispatch funkcija
  const navigate = useNavigate(); // Izmantojam navigate, lai novirzītu lietotāju pēc logout

  // Iegūstam isAuthenticated no Redux stāvokļa
  const isAuthenticated = useSelector(state => state.login.isLoggedIn);

  useEffect(() => {
    // Šī daļa tagad nav nepieciešama, jo mēs iegūstam autentifikācijas statusu no Redux
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Pārslēdz izvēlnes stāvokli
  };

  const handleLogout = () => {
    // Izsauc logout funkciju no Redux
    dispatch(logout());

    // Izdzēšam tokenus no localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Novirzām lietotāju uz login lapu pēc logout
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="TalkTown Logo" />
          </Link>
        </h2>
        <label 
          htmlFor="menu-toggle" 
          className={styles.hamburgerBtn} 
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </label>
        <ul className={`${styles.links} ${isMenuOpen ? styles.active : ''}`}>
          <li><Link to="/mainPage" className={styles.linkButton}>Home</Link></li>
         
          {/* Profile poga tiek parādīta tikai tad, ja lietotājs ir ielogojies */}
          {isAuthenticated && (
            <li><Link to="/profile" className={styles.linkButton}>Profile</Link></li>
          )}

          {!isAuthenticated ? (
            <>
              {/* Login/Register poga tiek parādīta tikai tad, ja lietotājs nav ielogojies */}
              <li>
                <Link to="/login" className={styles.linkButton} id="login-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10H3M10 15l5-5-5-5" />
                  </svg>
                  Login/Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Logout kā linka poga */}
              <li>
                <Link 
                  to="/logout" 
                  onClick={handleLogout} 
                  className={styles.linkButton} 
                  id="logout-button"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
