import App from './App.jsx'
import LoginForm from './components/LoginForm/LoginForm.component.jsx'
import RegistrationForm from './components/RegistratioForm/RegistrationForm.jsx'
import Home from './components/Home/Home.jsx'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx'

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <Home /> },
        ]
      },
      { path: "login", element: <LoginForm /> },
      { path: "registration", element: <RegistrationForm /> }
    ]
  }
]