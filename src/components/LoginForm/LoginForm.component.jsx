import { useState, useEffect } from "react";
import styles from "./LoginForm.module.scss";
import { signIn } from "../services/login.service.js";
import Input from "../Input/Input.component.jsx";
import Card from "../Card/Card";
import { Link, useNavigate } from 'react-router-dom'
import { IoLogIn } from "react-icons/io5";


const LoginForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setServerError("");

        if (!formValue.email || formValue.email.trim() === "") {
            setEmailError("Email obbligatoria");
            return;
        }
        if (!formValue.email.includes("@")) {
            setEmailError("Email non valida");
            return;
        }
        if (!formValue.password || formValue.password.trim() === "") {
            setPasswordError("Password obbligatoria");
            return;
        }
        if (formValue.password.length < 6 || formValue.password.includes(" ")) {
            setPasswordError("La password deve essere lunga almeno 6 caratteri");
            return;
        }

        try {
            const data = await signIn({
                email: formValue.email,
                password: formValue.password,
            });
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.name));
                navigate("/Posts");
            }
            alert("Login avvenuto: " + JSON.stringify(data));
        } catch (error) {
            setServerError(error.message);
        }
    };


    return (
        <Card className="card" title="login">
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input id="email" label="Indirizzo email" type="text" name="email" placeholder="Email" value={formValue.email} error={emailError} onChange={handleChange} />
                <Input id="password" label="Password" type="password" name="password" placeholder="Password" value={formValue.password} error={passwordError} onChange={handleChange} />
                <button type="submit" className={styles.submitButton}>
                    <IoLogIn /> LOGIN
                </button>

                {serverError && <small>{serverError}</small>}
                <div className={styles.RegistrationLink}>
                    <Link to="/registration">Registrati</Link> {/* ✅ */}
                </div>
            </form>
        </Card>
    );
};

export default LoginForm;