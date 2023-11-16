import './style.css';

import StatsSection from '../../components/BoardComponents/StatsSection';
import HeaderSection from '../../components/BoardComponents/HeaderSection';
import HelpSection from '../../components/BoardComponents/HelpSection';
import ProblemSection from '../../components/BoardComponents/ProblemSection';
import ButtonsSection from '../../components/BoardComponents/ButtonsSection';

import { getBoardObject } from "../../services/getLang.js";
import { getExercicesByLevel } from "../../services/getExcercices.js";

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