import React, { useEffect, useState }  from "react";
import "./style.css";



function Question ({text, questionIndex, handleAnswer, emojis}) {
    text = text || "Pregunta";
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        handleAnswer(text, questionIndex, selected)
    }, []);

    const handleSelect = (e) => {

        let selected = e.target.id;
        //parseInt(selected);
        selected = parseInt(selected);

        setSelected(selected);

    }

    useEffect(() => {
        handleAnswer(text, questionIndex, selected)
    }, [selected]);


    return (
        <li>
            <h3>{questionIndex+1+'.-'+text}</h3>
            <div className="options">
                {
                    emojis.map((option, index) => {
                        return (
                            
                            <i key={index + text} id={index + 1} onClick={handleSelect}
                            className={`fa-solid ${option.emoji} ${ selected === (index + 1) ?"selected" : ""}`}
                            style={{color: option.color}}></i>
                            
                        );
                    })
                }
            </div>
        </li>
    );
}

export default Question;