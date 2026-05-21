import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  

  return (
    <header className={styles.main_header}>
      <h1 className={styles.title}>Blog</h1>

      <div className={styles.right}>
        <span className={styles.debug}>{token ? "Loggato" : "Non loggato"}</span>
        {token ? (
          <button type="button" onClick={handleLogout} className={styles.auth_link}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={styles.auth_link}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;