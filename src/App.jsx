import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm/LoginForm.component.jsx';
import RegistrationForm from './components/RegistratioForm/RegistrationForm';
import Card from './components/Card/Card';

const isLoggedIn = !!localStorage.getItem("token");

function App() {
  const [page, setPage] = useState(isLoggedIn ? 'home' : 'login');

  if (page === 'home') {
    return (
      <div>
        <h1>Benvenuto nella home page!</h1>
        <button onClick={() => {
        localStorage.removeItem("token");
        setPage('login');
      }}>
        Logout
      </button>
      </div>
    );
  }

  if (page === 'registration') {
    return (
      <Card title="registrati">
        <RegistrationForm onGoToLogin={() => setPage('login')} />
      </Card>
    );
  }

  return (
    <Card title="accedi">
      <LoginForm
        onGoToRegister={() => setPage('registration')}
        onLogin={() => setPage('home')}
      />
    </Card>
  );
}

export default App