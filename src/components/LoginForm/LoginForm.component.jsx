import { useState } from "react";
import styles from "./LoginForm.module.css";
import { signIn } from "../services/login.service.js";
import Input from "../Input/Input.component.jsx";

const LoginForm = ({ onGoToRegister, onLogin }) => {
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
            if(data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                onLogin();
            }
            alert("Login avvenuto: " + JSON.stringify(data));
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <Input id="email" label="Indirizzo email" type="text" name="email" placeholder="Email" value={formValue.email} error={emailError} onChange={handleChange} />

            <Input id="password" label="Password" type="password" name="password" placeholder="Password" value={formValue.password} error={passwordError} onChange={handleChange} />



            <button type="submit">Clicca</button>
            {serverError && <small>{serverError}</small>} {/* ← mostrato qui */}
            <p>
                Non hai un account?{" "}
                <button type="button" onClick={onGoToRegister}>
                    Registrati
                </button>
            </p>

        </form>
    );
};

export default LoginForm;