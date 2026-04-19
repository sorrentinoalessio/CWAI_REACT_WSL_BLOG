import styles from "./Card.module.css";

export const Card = ({title,sottotitolo, children}) => {
    return <div className={styles.card}>
    <h2>{title}</h2>
    {children}
    </div>
}