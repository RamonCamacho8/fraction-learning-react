import './style.css';

import StatsSection from '../../components/BoardComponents/StatsSection';
import HeaderSection from '../../components/BoardComponents/HeaderSection';
import HelpSection from '../../components/BoardComponents/HelpSection';
import ProblemSection from '../../components/BoardComponents/ProblemSection';
import ButtonsSection from '../../components/BoardComponents/ButtonsSection';

import { getBoardObject } from "../../services/getText.js";


export default function Board({pApertura,pNeuroticismo, userName, language}){
    console.log("Board", language);
    const langObject = getBoardObject(language);
    return(

        <div className="board">
            <HeaderSection name={userName} text = {langObject.headerPanel} />
            <ProblemSection pApertura={pApertura} textProblem = {langObject.problemPanel} textAnswer = {langObject.answerPanel} />
            <ButtonsSection />
            <HelpSection pApertura={pApertura} pNeuroticismo={pNeuroticismo} text = {langObject.helpPanel}/>
            <StatsSection text = {langObject.statsPanel} />
        </div>
    );

}