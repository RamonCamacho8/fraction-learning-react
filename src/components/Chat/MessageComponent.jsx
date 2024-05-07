import styles from './styles.module.css';


export default function MessageComponent({ message, sender}) {

    return (
        <div className={styles.message}>
            <p className={ sender === 'bot' ? styles.bot : styles.user}  >{message}</p>
        </div>
    );
}