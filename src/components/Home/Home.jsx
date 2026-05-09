import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';


const Home = () => {
    const { theme, switchTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <Card title="Home">
            <h1>Benvenuto!</h1>
            <div>
                <button onClick={switchTheme}>Switch Theme</button>
                {theme}
                {user ? `Ciao, ${user}!` : "Benvenuto!"}</div>
            <button onClick={handleLogout}>Logout</button>
        </Card>
    );
};

export default Home;