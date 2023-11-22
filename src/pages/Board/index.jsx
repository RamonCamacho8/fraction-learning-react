import './style.css';

import StatsSection from '../../components/StatsSection';
import HeaderSection from '../../components/HeaderSection';
import HelpSection from '../../components/HelpSection';
import ProblemSection from '../../components/ProblemSection';
import ButtonsSection from '../../components/ButtonsSection';

import { getBoardObject } from "../../services/Language.js";
import { getExercicesByLevel } from "../../services/Excercices.js";

import { useState } from 'react';


export default function Board({pApertura,pNeuroticismo, userName, language}){

    const lang = getBoardObject(language);
    const exercises = getExercicesByLevel('easy');

    const [trys, setTrys] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    

    const handleRevision = () => {
        setTrys(trys + 1);
        
    }



    return(

        <div className="board">
            <HeaderSection name={userName} text = {lang.headerPanel} />
            <ProblemSection pApertura={pApertura} 
            textProblem = {lang.problemPanel}
            textAnswer = {lang.answerPanel} 
            setSelectedAnswer={setSelectedAnswer} 
            exercices={exercises}
            />
            <ButtonsSection selectedAnswer={selectedAnswer} handleCheck={handleRevision} />
            <HelpSection pApertura={pApertura} pNeuroticismo={pNeuroticismo} text = {lang.helpPanel}/>
            <StatsSection text = {lang.statsPanel} trys={trys} />
        </div>
    );

}