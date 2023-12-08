import { useState, useEffect } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useExercices } from "../../Context/ExercicesContext";
import { useStats } from "../../Context/StatsContext";
import "./style.css";
import { FaClock } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IconContext } from "react-icons";


export default function StatsSection(){

    const { languageData } = useLanguage();
    const traductionText = languageData["board"].statsPanel;
    const { difficulty } = useExercices();
    const difficultyText = languageData["board"].difficulty;
    const {time, setTime} = useStats();
    const {trys} = useStats();
    let visual = true;

    function TimePanel(){

        //const [time, setTime] = useState(0);
        const [isRunning, setIsRunning] = useState(true);
    
        function formatTime(time){
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return `${minutes < 10 ? '0'+minutes: minutes}:${seconds < 10 ? '0'+seconds: seconds}`;
        }
    
        /*useEffect(() => {
            let intervalId;
            if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 1000);
            }
            return () => clearInterval(intervalId);
        }, [isRunning, time]);*/
    
        let stringTime = formatTime(time);
    
        const startAndStop = () => {
            setIsRunning(!isRunning);
        };
    
        const reset = () => {
            setTime(0);
        };

        
    
        return(
            
    
            <div className="timePanel">
                {visual ? (<div className="icon"><FaClock/></div>) : (<h5 className="time">{traductionText.time}</h5>)}
                <h6 className="timeField">{stringTime}</h6>
            </div>
        );
    
    }

    const LevelPanel = () => {
        return(
            <div className="levelPanel">
                {visual ? (<div className="icon"><FaFlagCheckered/></div>) : (<h5 className="level">{traductionText.level}</h5>)}
                <h6 className="levelField">{difficultyText[difficulty]}</h6>

            </div>
        );
    }

    const TrysPanel = () => {

        return(
            <div className="errorsPanel">
                
                {visual ? (<div className="icon"><MdError/></div>) : (<h5 className="errors">{traductionText.errors}</h5>)}
                <h6 className="errorsField">{`${trys}`}</h6>
            </div>
        );

    
    }

    return(
        <div className="statsSection">
            <IconContext.Provider value={{ className: 'react-icons' }}>
                <TrysPanel />
                <TimePanel  />
                <LevelPanel />
            </IconContext.Provider>
        </div>
    );
}