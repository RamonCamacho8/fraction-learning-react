import { useState, useEffect } from "react";

function ErrosPanel({numErrors}){

    numErrors = numErrors || 0;

    return(
        <div className="errorsPanel">
            <div className="errors">Intentos:</div>
            <div className="errorsField">{numErrors}</div>
        </div>
    );
}

function HelpsPanel({numHelps}){
    numHelps = numHelps || 0;
    return(
        <div className="helpsPanel">
            <div className="helps">Ayudas:</div>
            <div className="helpsField">{numHelps}</div>
        </div>
    );
}

function formatTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? '0'+minutes: minutes}:${seconds < 10 ? '0'+seconds: seconds}`;
}

function TimePanel({}){
    // state to store time
    const [time, setTime] = useState(0);
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
        // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
        intervalId = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    let stringTime = formatTime(time);

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    return(
        <div className="timePanel">
            <div className="time">Tiempo:</div>
            <div className="timeField">{stringTime}</div>
        </div>
    );

}

function LevelPanel(){
    return(
        <div className="levelPanel">
            <div className="level">Nivel actual:</div>
            <div className="levelField">1</div>
        </div>
    );
}

export default function StatsSection(){
    return(
        <div className="statsSection">
            <TimePanel />
            <ErrosPanel />
            <HelpsPanel />
            <LevelPanel />
        </div>
    );
}