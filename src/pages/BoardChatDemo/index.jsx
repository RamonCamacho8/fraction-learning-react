import "./style.css";
import correctAudio from "../../assets/sfx/correct.mp3";
import wrongAudio from "../../assets/sfx/wrong.mp3";
import tickAudio from "../../assets/sfx/tick.mp3";
import tackAudio from "../../assets/sfx/tack.mp3";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";
import { useExercices } from "../../Context/ExercicesContext.js";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { isCorrectAnswer } from "../../Controllers/ExercicesController.js";
import { updateData } from "../../Controllers/dataFetch.js";

import Chat from "../../components/Chat/index.jsx";


const correctSound = new Audio(correctAudio);
const wrongSound = new Audio(wrongAudio);
const tick = new Audio(tickAudio);
const tack = new Audio(tackAudio);

export default function Board({}) {

  const { userData, setUserData } = useUser();
  const navigate = useNavigate();

  const [isCorrect, setIsCorrect] = useState(false);
  const [time, setTime] = useState(0);
  const [trys, setTrys] = useState(0);
  const [exercisesData, setExercisesData] = useState({});
  const [isTimeRunning, setIsTimeRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isTick, setIsTick] = useState(false);
  const checkRef = useRef(null);
  const nextRef = useRef(null);


  const { selectedAnswer, currentExerciceIndex,
          difficulty, currentExercice,
          hasNextExercice, nextExercice,
          hastNextDifficulty, nextDifficulty, reset} = useExercices();


  useEffect(() => {
    reset();
  }, []);


  const handleCheck = () => {
      
      checkRef.current.style.transition =  'color 0.5s';
      
      setTrys(trys+1);

      if(isCorrectAnswer(selectedAnswer, currentExercice)){
        correctSound.load();
        correctSound.play();
        setIsCorrect(true);
        checkRef.current.style.color = 'green';
        setExercisesData((prevData) => {
          return {
            ...prevData,
            [difficulty]: {
              ...prevData[difficulty],
              [currentExerciceIndex]: {
                trys: trys,
                time: time,
              },
            },
          };
        });
        setIsTimeRunning(false);     
      }
      else {
        
        wrongSound.load();
        wrongSound.play();
        checkRef.current.style.color = 'red';

        setIsCorrect(false);
      }
  }

  const resetForNextExercice = () => {
    setIsTimeRunning(true);
    setIsCorrect(false);
    setTrys(0);
    setTime(0);
  }

  const handleNext = () => {
    
    checkRef.current.style.color = 'white';
    //Check is there are more exercises
    if(hasNextExercice()){
      nextExercice();
      resetForNextExercice();
    }
    //If there are no more exercises, check if there are more difficulties
    else if(hastNextDifficulty()){
      nextDifficulty();
      resetForNextExercice();
    }
    //If there are no more difficulties, navigate to survey
    else{
      alert('No hay más ejercicios');
      setIsFinished(true);
      //navigate('/survey');
    }
    
  }
  /*--------------------------------------------- UseEffects ---------------------------------------------*/
  useEffect(() => {
    let intervalId;
    
    // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
    if (isTimeRunning){

      /* if(isTick){
        tick.play();
        setIsTick(false);
      } else {
        tack.play();
        setIsTick(true);
      } */

      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
      
    
    return () => clearInterval(intervalId);
  }, [isTimeRunning, time]);

  useEffect(()=>{
    checkRef.current.style.color =  'white';
  },[selectedAnswer])

  useEffect(() => {
    if(isFinished){
      setUserData((prevData) => {
        return {
          ...prevData,
          exercisesData: exercisesData,
        };
      });
    }
  }, [isFinished]);

  useEffect(()=>{
    
   if(!(JSON.stringify(userData.exercisesData) === '{}' || !userData.exercisesData)){
    //console.log('Data updated', userData.exercisesData)
    updateData( userData, userData.userId).then(() => {
      navigate("/survey");
    });
   }
    
  },[userData.exercisesData]);

  /* -------------------------------------------------------------------------------------------------------*/

  return (
        <main className="main-container">
          <div className="board-container">
            <Chat welcomeMessage={'¡Hola! Estoy aquí para ayudarte con tus dudas.'} />
            <HeaderSection />
            <StatsSection time={time} trys={trys} difficulty={difficulty} />
            <h4>Resuelve la siguiente suma:</h4>
            <ProblemSection  />
            <ButtonsSection onCheck={handleCheck} onNext={handleNext} isCorrect={isCorrect} nextRef={nextRef} checkRef={checkRef} />
            <HelpSection  />
          </div>
        </main>
  );
}
