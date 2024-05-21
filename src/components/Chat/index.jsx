import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import Messages from './Messages.jsx'

import OpenAIChat from '../../services/ChatGPT.js';
import Sparks from './Sparks.jsx';

export default function Chat({welcomeMessage}) {

    let [isOpen, setIsOpen] = useState(false);
    let [messages, setMessages] = useState([]);
    let [inputValue, setInputValue] = useState('');

    useEffect( ()=> {
        if(welcomeMessage){
            let message = {text: welcomeMessage, sender: 'bot'}
            setMessages([...messages, message])
        }
    },[])


    const addMessage = (message) => {

        setMessages(prev => [...prev, message]);
        setInputValue('');

    }

    useEffect(() => {
        if(messages.length > 0 && messages[messages.length - 1].sender === 'user'){
            OpenAIChat.sendMessage(messages[messages.length - 1].text)
            .then(response => {
                addMessage({text: response, sender: 'bot'})
            })
        }
    }, [messages])




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
                    <button onClick={() => addMessage({text: inputValue, sender: 'user'}) } >Enviar</button>
                </div>
                
            </div>}
            {!isOpen && <button className={styles.chat__button} onClick={()=> setIsOpen(true)} >
                <Sparks />
                </button>}
        </div>
    );
}