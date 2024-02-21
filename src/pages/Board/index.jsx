import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";
import { useExercices } from "../../Context/ExercicesContext.js";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { isCorrectAnswer } from "../../Controllers/ExercicesController.js";
import { updateData } from "../../Controllers/dataFetch.js";

export default function Board({}) {

  const { userData, setUserData } = useUser();
  const navigate = useNavigate();

  const [isCorrect, setIsCorrect] = useState(false);
  const [time, setTime] = useState(0);
  const [trys, setTrys] = useState(0);
  const [exercisesData, setExercisesData] = useState({});
  const [isTimeRunning, setIsTimeRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const { selectedAnswer, currentExerciceIndex,
          difficulty, currentExercice,
          hasNextExercice, nextExercice,
          hastNextDifficulty, nextDifficulty} = useExercices();

  /* useEffect(() => {
    if (!userData.userId) {
      navigate("/");
    }
  }, [userData]); */

  //Counter for time.
  
   
  const handleCheck = () => {

      if(isCorrectAnswer(selectedAnswer, currentExercice)){
        setIsCorrect(true);
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
      setTrys(trys+1);
          

  }
  const resetForNextExercice = () => {
    setIsTimeRunning(true);
    setIsCorrect(false);
    setTrys(0);
    setTime(0);
  }

  const handleNext = () => {
    
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
  /* --------------------------------------------- UseEffects ---------------------------------------------*/
  useEffect(() => {
    let intervalId;
    
    // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
    if (isTimeRunning)
      intervalId = setInterval(() => setTime(time + 1), 1000);
    
    return () => clearInterval(intervalId);
  }, [isTimeRunning, time]);


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
    console.log('Data updated')
    //updateData(userData.userId, userData.exercisesData);
   }
    

  },[userData.exercisesData]);

  
  /* -------------------------------------------------------------------------------------------------------*/

  return (
        <main className="main-container">
          <div className="board-container">
            <HeaderSection />
            <StatsSection time={time} trys={trys} difficulty={difficulty} />
            <h4>Resuelve la siguiente suma:</h4>
            <ProblemSection />
            <ButtonsSection onCheck={handleCheck} onNext={handleNext} isCorrect={isCorrect} />
            <HelpSection  />
          </div>
        </main>
  );
}
