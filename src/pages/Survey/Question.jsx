import React, { useEffect, useState }  from "react";
import "./style.css";



function Question ({text, questionIndex, handleAnswer, emojis}) {
    text = text || "Pregunta";
    const [selected, setSelected] = useState(null);
    

    const handleSelect = (e) => {

        let selected = e.target.id;
        setSelected(selected);

    }

    useEffect(() => {
        handleAnswer(text, selected)
    }, [selected]);


    return (
        <li>
            <h3>{questionIndex+1+'.-'+text}</h3>
            <div className="options">
                {
                    emojis.map((option, index) => {
                        return (
                            
                            <i key={index + text} id={index + 1} onClick={handleSelect}
                            className={`fa-solid ${option.emoji} ${ selected == (index + 1) ?"selected" : ""}`}
                            style={{color: option.color}}></i>
                            
                        );
                    })
                }
            </div>
        </li>
    );
}

export default Question;