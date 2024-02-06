import "./style.css";
import { useLanguage } from "../../Context/LanguageContext";

import { ExercicesProvider } from "../../Context/ExercicesContext";
import { useEffect, useState } from "react";
import { GoStopwatch } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { GoMortarBoard } from "react-icons/go";
import { IconContext } from "react-icons";


export default function BoardV2({}) {

    const { languageData } = useLanguage();
    const headerTraduction = languageData["board"].headerPanel;
    
    const [date, setDate] = useState();
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const date = new Date();

        let fullDate = `${date.getDate()} / ${headerTraduction.months[date.getMonth()]} / ${date.getFullYear()}`;

        setDate(fullDate);
    }, []);

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


    return (
        <ExercicesProvider>
            <div className="board-container-v2">
                <main className="board-v2">
                    <header>
                        <div className="student">
                            <h6>User's Name</h6>
                        </div>
                        <div className="date">
                            <h6>{date}</h6>
                        </div>
                        <div className="title">
                            <h2>{headerTraduction.subject}</h2>
                        </div>
                    </header>
                    <section className="stats-panel">
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        <ul>
                            <li className="time">
                                <i className="icon"><GoStopwatch/></i>
                                <h6>{stringTime}</h6>
                            </li>
                            <li className="trys">
                                <i className="icon"><GoStop/></i>
                                <h6>0</h6>
                            </li>
                            <li className="level">
                                <i className="icon"><GoMortarBoard/></i>
                                <h6>1</h6>
                            </li>
                        </ul>
                    </IconContext.Provider>
                    </section>
                    <section>

                    </section>
                    <footer>

                    </footer>
                </main>
            </div>
            
        </ExercicesProvider>
    );
}