import { useState, useEffect } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useExercices } from "../../Context/ExercicesContext";
import { useStats } from "../../Context/StatsContext";
import "./style.css";
import { IconContext } from "react-icons";


import { GoStopwatch } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { GoMortarBoard } from "react-icons/go";




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
    
        /* useEffect(() => {
            let intervalId;
            if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 1000);
            }
            return () => clearInterval(intervalId);
        }, [isRunning, time]); */
    
        let stringTime = formatTime(time);
    
        const startAndStop = () => {
            setIsRunning(!isRunning);
        };
    
        const reset = () => {
            setTime(0);
        };

        
    
        return(
            <li className="time-panel">
                <GoStopwatch/>
                <h6 className="time">{stringTime}</h6>
            </li>
        );
    
    }

    const LevelPanel = () => {
        return(
            <li className="level-panel">
                <GoMortarBoard/>
                <h6 className="level">{difficultyText[difficulty]}</h6>
            </li>
        );
    }

    const TrysPanel = () => {

        return(
            <li className="errors-panel"> 
                <GoStop/>
                <h6 className="errors">{`${trys}`}</h6>
            </li>
        );

    
    }

    return(
        <section className="stats">
            <IconContext.Provider value={{ className: 'react-icons' }}>
                <ul>
                    <TrysPanel />
                    <TimePanel  />
                    <LevelPanel />
                </ul>
            </IconContext.Provider>
        </section>
    );
}