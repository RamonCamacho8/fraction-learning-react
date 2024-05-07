import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import MessageComponent  from './MessageComponent.jsx';

export default function Chat() {

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.chat}>
            {isOpen && 
            <div className={styles.chat__content}>

                <div className={styles.chat__header}>
                    <h2>GPT Chat</h2>
                    <button className={styles.chat__close} onClick={()=> setIsOpen(false)}>X</button>
                </div>

                <div className={styles.chat__body}>
                    <MessageComponent message="Hola! ¿Cómo te puedo ayudar? " sender="bot" />
                </div>

                <div className={styles.chat__footer}>
                    <input type="text" placeholder="Haz tu preguntas" />
                    <button>Enviar</button>
                </div>
                
            </div>}
            {!isOpen && <button className={styles.chat__button} onClick={()=> setIsOpen(true)} ></button>}
        </div>
    );
}