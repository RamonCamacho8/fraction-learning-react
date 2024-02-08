import { useLanguage } from "../../Context/LanguageContext";

import { ExercicesProvider, useExercices } from "../../Context/ExercicesContext";
import { useEffect, useState } from "react";
import { GoStopwatch } from "react-icons/go";
import { GoStop } from "react-icons/go";
import { GoMortarBoard } from "react-icons/go";
import { IconContext } from "react-icons";
import { useUser } from "../../Context/UserContext";
import { isCorrectAnswer } from "../../Controllers/ExercicesController";
import PieFraction from "../../lib/ui/Fractions/PieFraction";
import RadioInput from "../../lib/ui/Buttons/RadioInput";

export default function BoardV2({}) {

    const { languageData } = useLanguage();
    const headerTraduction = languageData["board"].headerPanel;
    const [date, setDate] = useState();
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);
    const {userData, setUserData}= useUser();
    

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
                            <h6>{userData.firstName || `Nombre de usuario`}</h6>
                        </div>
                        <div className="date">
                            <h6>{date}</h6>
                        </div>
                        <div className="title">
                            <h2>{headerTraduction.subject}</h2>
                        </div>
                    </header>
                    <main className="board-body">
                        <section className="stats-panel">
                        <IconContext.Provider value={{ className: 'react-icons' }}>
                            <ul>
                                <li className="time">
                                    <i className="icon"><GoStopwatch/></i>
                                    <h5>{stringTime}</h5>
                                </li>
                                <li className="trys">
                                    <i className="icon"><GoStop/></i>
                                    <h5>0</h5>
                                </li>
                                <li className="level">
                                    <i className="icon"><GoMortarBoard/></i>
                                    <h5>1</h5>
                                </li>
                            </ul>
                        </IconContext.Provider>
                        </section>
                        <section className="exercise-panel" >
                            
                            <PieFraction numerador={3} denominador={4} color={"#ff00ff"} />
                            <div className="sum">+</div>
                            <PieFraction numerador={3} denominador={4} color={"#ff00ff"} />

                        </section>
                        <section className="answer-panel">
                            <Answers />
                        </section>
                        <section className="buttons-panel">
                            <CheckButton />
                        </section>
                    </main>
                    
                    <footer>

                    </footer>
                </main>
            </div>
            
        </ExercicesProvider>
    );
}


function Answers ({}) {

    const { setSelectedAnswer, currentExercice} = useExercices();
    const answerOptions =currentExercice.options;

    useEffect(() => {
        console.log(currentExercice);
    }, [currentExercice]);

    return(
        
        <>
            {answerOptions.map((option, index) => {
                return(
                    <RadioInput key={index} value={option} id={index} setSelectedAnswer={setSelectedAnswer} />
                );
            })}
        </>
    );
}

const CheckButton = ({}) => {

    const {selectedAnswer, currentExercice,hasNextExercice, nextExercice, hastNextDifficulty, nextDifficulty} = useExercices();

    const handleCheck = () => {
        if(isCorrectAnswer(selectedAnswer, currentExercice )){
            if(hasNextExercice()){
                nextExercice();
            }else if(hastNextDifficulty()){
                nextDifficulty();
            }else{
                navigate('/');
            }
            setTrys(0);
            setTime(0);
        }
        else {
            setTrys(trys+1);
        }
    }

    return(
        <button className="check-button" onClick={handleCheck}>Check</button>

    );

}