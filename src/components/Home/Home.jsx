import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card';

const Home = () => {
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
            <div>{user ? `Ciao, ${user}!` : "Benvenuto!" }</div>
            <button onClick={handleLogout}>Logout</button>
        </Card>
    );
};

export default Home;