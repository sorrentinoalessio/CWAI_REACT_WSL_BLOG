import { useEffect, useState } from "react";
import styles from "./LoginForm.module.css"


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmailError('');
        if(!e.target.value.includes('@')){
            setEmailError('email non valida');
        }
         setEmail(e.target.value);

       
    }
    const handlePasswordChange = (e) => {

        setPassword(e.target.value);
    }

    useEffect(() => {
        console.log(email);
    }, [email]
    )
    return (

        <form className={styles.login_form}>
            <div>
                <label htmlFor="email">Indirizzo email</label>
                <input type="email"
                    placeholder="Email"
                    name="email"
                    className={styles.input}
                    value={email}
                    id="email"
                    onChange={handleEmailChange} />
            </div>
            <small>{emailError}</small>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"
                    placeholder="Password"
                    name="password"
                    className={styles.input}
                    value={password}
                    id="password"
                    onChange={handlePasswordChange} />
            </div>
            <button type="submit">Clicca</button>
        </form>

    )
}


export default LoginForm 