import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Card from '../Card/Card';
import { ThemeContext } from '../../contexts/ThemeProvider';
import PublicPosts from '../Posts/PostPublicList/PostPublicList';
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { theme, switchTheme } = useContext(ThemeContext); // tieni solo se li usi
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Card title="Home">
      <h1>Benvenuto{user?.username ? `, ${user.username}` : ""}!</h1>
      <Card title="Post pubblici">
        <PublicPosts />
      </Card>
    </Card>
  );
};

export default Home;