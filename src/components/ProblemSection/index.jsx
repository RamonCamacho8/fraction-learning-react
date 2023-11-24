import 'chart.js/auto';
import './style.css'
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { useRef } from 'react';
import { useLanguage } from '../../Context/LanguageContext';
import { usePersonality } from '../../Context/PersonalityContext';
import { useExercices } from '../../Context/ExercicesContext';
import { isCorrectAnswer } from '../../Controllers/ExercicesController';

function ProblemSection(){
  

    return(
        <div className="problemSection">
            
            <ResultPanel />
            <ProcedurePanel />

        </div>
    );

}

function ResultPanel(){

    const answerComponents = AnswersPanel();
    let traductionText = useLanguage().languageData['board'].answerPanel;

    return(

        <div className="resultPanel">
            <div className="resultText">{traductionText}</div>
            <div className="answerPanel"> {answerComponents} </div>
        </div>

    );
}

function ProcedurePanel(){

    let hasOpenness = usePersonality().openess;
    const {currentExercice} = useExercices();
    let fractions = currentExercice.fractions;
    let fractionsComponents = fractionComponentsGenerator({pApertura: hasOpenness, fractionsNumbers: fractions, colorType: 'multi' });
    
    const traductionText = useLanguage().languageData['board'].problemPanel;

    return (
        <div className="procedurePanel">
            <div className='fractionsText'>{traductionText}</div>
            <div className="fractions"> {fractionsComponents} </div>
        </div>
    );
}

function AnswerButton({value, id}){

    const {setSelectedAnswer} = useExercices();
    

    return (

        <button id={id} className="answerButton" value={value} onClick={
            () => {setSelectedAnswer(id)}
        } >{value[0]+"/"+value[1]}</button>
    );

}

function AnswersPanel(){

    const {currentExercice} = useExercices();
    const options = currentExercice.options;

    let answerPanels = [];
    for(let i = 0; i < options.length; i++){

        answerPanels.push(<AnswerButton key={i+'-'+options[i]} value={options[i]}  id={i} />);
        
    }
    return answerPanels;

}







//Fraction Components
function FractionPieChartComponent({ numerador, denominador, color }) {

    const partAngle = 360 / denominador;
    color = color;

    const data = {
        labels: [],
        datasets: [{
            label: `${numerador}/${denominador}`,
            data: Array(denominador).fill(1),
            backgroundColor: [...Array(numerador).fill(color),...Array(denominador - numerador).fill('rgb(39, 76, 67)')],
            borderColor: [...Array(numerador).fill('white'), ...Array(denominador - numerador).fill('white')],
            offset: 15,

        }]
    };

    const options = {
        cutout: 0,
        radius: "100%", // Change this value to set the desired radius
        circumference: 360,
        rotation: Math.floor(Math.random() * 4) * partAngle,
        animation: {
            animateRotate: false,
            animateScale: false
        }
    };

    const [optionsState, setOptions] = useState(options);
    const [dataState, setDataState] = useState(data);



    return (
        <div className="pieFraction">
            <Pie data={dataState} options={optionsState} />
        </div>

    );
}

function FractionNumberComponent({numerador, denominador}){

    return(

        <div className="fraction">
            <div className="numerator">{numerador} </div>
            <div className="fractionBar">----</div>
            <div className="denominator">{denominador} </div>
        </div>

    );
}

function Symbol({symbol}){
    return(
        <div className="SymbolComponent">
            {symbol}
        </div>
    );
}


//Functions for fraction components
function colorSelector({colorOption}){

    const color = colorOption || 'multi';
    const definedColors = ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)']
    switch(color){
        case 'mono':
            return 'rgb(39, 76, 67)';
        case 'multi':
            return definedColors[Math.floor(Math.random() * definedColors.length)];
        default:
            return 'rgb(39, 76, 67)';
    }

}

function fractionComponentSelector({pApertura}){

    switch(pApertura){
        case true:
            return FractionPieChartComponent;
        case false:
            return FractionNumberComponent;
        default:
            return FractionNumberComponent;
    }

}

function fractionComponentsGenerator({pApertura, fractionsNumbers, colorType = 'multi'}){

    let Component = fractionComponentSelector({pApertura: pApertura});
    let fractionsComponents = [];
    

    for(let i = 0; i < fractionsNumbers.length; i++){
        const [numerador, denominador] = fractionsNumbers[i];
        const symbol = i ===  fractionsNumbers.length - 1 ? "=" : "+";
        const componetKey = `${i} + ${numerador}/${denominador}`;
        const symbolKey = `${i} + ${symbol}`;

        fractionsComponents.push(<Component key={componetKey} numerador={numerador} denominador={denominador}  color = {colorSelector({colorOption:colorType})}/>, <Symbol key={symbolKey} symbol={symbol} />);
    }


    return fractionsComponents;


}


export default ProblemSection;