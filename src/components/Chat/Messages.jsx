import React from 'react';
import MessageComponent from './MessageComponent.jsx';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';


export default function Messages({messages}) {

    

    return (
        <div >
            {messages.map((message, index) => {
                return <MessageComponent key={index} message={message.text} sender={message.sender} />
            })}
        </div>
    );
}