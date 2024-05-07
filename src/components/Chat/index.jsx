import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import Messages from './Messages.jsx'


export default function Chat() {

    let [isOpen, setIsOpen] = useState(false);
    let [messages, setMessages] = useState([{ text: "Hola! ¿Cómo te puedo ayudar?", sender: "bot" },{ text: "Con nada", sender: "user" },]);
    let [inputValue, setInputValue] = useState('');

    const addMessage = (message) => {
        
        setMessages([...messages, message]);
    }


    return (
        <div className={styles.chat}>
            {isOpen && 
            <div className={styles.chat__content}>

                <div className={styles.chat__header}>
                    <h2>GPT Chat</h2>
                    <button className={styles.chat__close} onClick={()=> setIsOpen(false)}>X</button>
                </div>

                <div className={styles.chat__body}>
                    <Messages messages={messages} />
                </div>

                <div className={styles.chat__footer}>
                    <input type="text" placeholder="Haz tu preguntas" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <button onClick={(e) => addMessage({text: inputValue, sender: 'user'}) } >Enviar</button>
                </div>
                
            </div>}
            {!isOpen && <button className={styles.chat__button} onClick={()=> setIsOpen(true)} ></button>}
        </div>
    );
}