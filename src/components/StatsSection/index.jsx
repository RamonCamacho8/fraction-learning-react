import { useState, useEffect } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { useExercices } from "../../Context/ExercicesContext";
import { useStats } from "../../Context/StatsContext";
import "./style.css";
import { IconContext } from "react-icons";


import { GoStopwatch } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { GoMortarBoard } from "react-icons/go";

export default function StatsSection(props){
    
    const { languageData } = useLanguage();
    const difficultyText = languageData["board"].difficulty;
    const {time, trys, difficulty} = props;

    function formatTime(time){
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        return `${minutes < 10 ? '0'+minutes: minutes}:${seconds < 10 ? '0'+seconds: seconds}`;
    }

    function TimePanel(){

        return(
            <li className="time-panel">
                <GoStopwatch/>
                <h6 className="time">{formatTime(time)}</h6>
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