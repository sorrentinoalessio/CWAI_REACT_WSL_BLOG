import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Menu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;