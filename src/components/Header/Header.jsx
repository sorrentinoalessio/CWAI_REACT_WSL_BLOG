import { useState, useEffect } from "react";
import { Link, useNavigate,NavLink } from "react-router-dom";
import styles from "./Header.module.scss";


const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Sincronizza lo stato di autenticazione tra tab / dopo modifiche programmatiche
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setIsLoggedIn(!!e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <header className={styles.main_header}>
      <h1 className={styles.title}>Blog</h1>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ""}`
          }
        >
          Chi siamo
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `${styles.nav_link} ${isActive ? styles.active : ""}`
          }
        >
          Articoli
        </NavLink>
      </nav>
      <div className={styles.right}>

        {isLoggedIn ? (
          <button type="button" onClick={handleLogout} className={styles.auth_link}>
            Esci
          </button>
        ) : (
          <Link to="/login" className={styles.auth_link}>
            Accedi
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;