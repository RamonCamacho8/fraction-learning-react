import {createContext, useContext, useState } from 'react';
import { getExercices, getDifficulties } from "../services/Excercices.js";

const ExercicesContext = createContext();

export const ExercicesProvider = (props) => {

        const availableDifficulties = getDifficulties();
        const [difficulty, setDifficulty] = useState('easy'); // ['easy', 'medium', 'hard']
        const [exercices, setExercices] = useState(getExercices()[difficulty]);
        const [currentExerciceIndex, setCurrentExerciceIndex] = useState(0);
        const [currentExercice, setCurrentExercice] = useState(exercices[currentExerciceIndex]);
        const [selectedAnswer, setSelectedAnswer] = useState(null); // [0, 1, 2, 3]

        const hasNextExercice = () => {
            return currentExerciceIndex < exercices.length - 1;
        }

        const nextExercice = () => {
            
            setCurrentExerciceIndex(currentExerciceIndex + 1);
            setCurrentExercice(exercices[currentExerciceIndex + 1]);
            setSelectedAnswer(null);
         
        }

    

        const hastNextDifficulty = () => {
            return availableDifficulties.indexOf(difficulty) < availableDifficulties.length - 1;
        }

        const nextDifficulty = () => {
            
            const nextDifficultyIndex = availableDifficulties.indexOf(difficulty) + 1;
            const nextDifficulty = availableDifficulties[nextDifficultyIndex];
            setDifficulty(nextDifficulty);
            setExercices(getExercices()[nextDifficulty]);
            setCurrentExerciceIndex(0);
            setCurrentExercice(getExercices()[nextDifficulty][0]);
            setSelectedAnswer(null);
        }


        return (
            <ExercicesContext.Provider value={
                {
                selectedAnswer,setSelectedAnswer,
                exercices, setExercices, 
                difficulty, setDifficulty, 
                currentExercice, setCurrentExercice, 
                currentExerciceIndex, setCurrentExerciceIndex,
                nextExercice, hasNextExercice,
                nextDifficulty, hastNextDifficulty,
                }}>
                {props.children}
            </ExercicesContext.Provider>
        );
    }



export const useExercices = () => {
    return useContext(ExercicesContext);
}