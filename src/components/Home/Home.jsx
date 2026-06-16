import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Card from '../Card/Card';
import { ThemeContext } from '../../contexts/ThemeProvider';
import PublicPosts from '../Posts/PostPublicList/PostPublicList';

const Home = () => {
  const { theme, switchTheme } = useContext(ThemeContext); // tieni solo se li usi
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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