import { useState, useEffect } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useExercices } from "../../Context/ExercicesContext";
import { useStats } from "../../Context/StatsContext";








export default function StatsSection(){

    const { languageData } = useLanguage();
    const traductionText = languageData["board"].statsPanel;
    const { difficulty } = useExercices();
    const difficultyText = languageData["board"].difficulty;
    const {time, setTime} = useStats();
    const {trys} = useStats();

    function TimePanel(){

        //const [time, setTime] = useState(0);
        const [isRunning, setIsRunning] = useState(true);
    
        function formatTime(time){
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            return `${minutes < 10 ? '0'+minutes: minutes}:${seconds < 10 ? '0'+seconds: seconds}`;
        }
    
        useEffect(() => {
            let intervalId;
            if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 1000);
            }
            return () => clearInterval(intervalId);
        }, [isRunning, time]);
    
        let stringTime = formatTime(time);
    
        const startAndStop = () => {
            setIsRunning(!isRunning);
        };
    
        const reset = () => {
            setTime(0);
        };
    
        return(
            <div className="timePanel">
                <div className="time">{traductionText.time}</div>
                <div className="timeField">{stringTime}</div>
            </div>
        );
    
    }

    const LevelPanel = () => {
        return(
            <div className="levelPanel">
                <div className="level">{traductionText.level}</div>
                <div className="levelField">{difficultyText[difficulty]}</div>
            </div>
        );
    }

    const TrysPanel = () => {

        return(
            <div className="errorsPanel">
                <div className="errors">{traductionText.trys}</div>
                <div className="errorsField">{`${trys}`}</div>
            </div>
        );

    
    }

    return(
        <div className="statsSection">
            <TimePanel  />
            <TrysPanel />
            <LevelPanel />
        </div>
    );
}