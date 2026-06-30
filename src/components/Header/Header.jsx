import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className={styles.main_header}>
            <h1 className={styles.title}>Blog</h1>

            <div className={styles.right}>
                {isAuthenticated ? (
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