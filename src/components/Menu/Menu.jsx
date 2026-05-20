import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <nav className={styles.menu}>
      <NavLink to="/" className={styles.link}>Home</NavLink>
      <NavLink to="/posts" className={styles.link}>Post</NavLink>
      <NavLink to="/profile" className={styles.link}>Profilo</NavLink>
    </nav>
  );
};

export default Menu;