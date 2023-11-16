import { useState, useEffect } from "react";

function ErrosPanel({trys, text}){



    return(
        <div className="errorsPanel">
            <div className="errors">{text}</div>
            <div className="errorsField">{`${trys}`}</div>
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

function TimePanel({text}){
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
            <div className="time">{text}</div>
            <div className="timeField">{stringTime}</div>
        </div>
    );

}

function LevelPanel({text}){
    return(
        <div className="levelPanel">
            <div className="level">{text}</div>
            <div className="levelField">1</div>
        </div>
    );
}

export default function StatsSection({text, trys}){
    return(
        <div className="statsSection">
            <TimePanel text ={text.time} />
            <ErrosPanel text = {text.trys} trys={trys}/>
            <LevelPanel text = {text.level} />
        </div>
    );
}