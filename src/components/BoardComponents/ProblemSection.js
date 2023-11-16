import 'chart.js/auto';
import '../styles/ProblemSection.css'
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getExercicesByLevel } from '../../services/getExcercices';

const example ={

    problemFractions : [[2,4],[1,4]],
    answers : [[3,8],[3,16],[2,4],[3,4]],
    correctAnswer: [3,4]

}

export default function ProblemSection({pApertura, textProblem, textAnswer, setSelectedAnswer : setSelectedAnswer, exercices:exercices}){

    const difficulty = 'easy'
    

    const [currentExercice, setCurrentExercice] = useState(exercices[0]);
   
    const handleCorrectAnswer = () => {
        setCurrentExercice(exercices[1]);
    }
    


    return(
        <div className="problemSection">
            <ResultPanel text = {textAnswer} options={currentExercice.options} pApertura={pApertura} setSelectedAnswer={setSelectedAnswer} />
            <ProcedurePanel text ={textProblem} pApertura={pApertura} fractions={currentExercice.fractions}/>
        </div>
    );

}

function ResultPanel({options: options, text, pApertura, setSelectedAnswer: setSelectedAnswer}){

    

    const answerComponents = AnswerPanels({options: options, setSelectedAnswer: setSelectedAnswer});


    return(

        <div className="resultPanel">
            <div className="resultText">{text}</div>
            <div className="answerPanel"> {answerComponents} </div>
        </div>


    );
}

function AnswerPanel({value, id, setSelectedAnswer}){


    const answerHandler = (e) => {

        setSelectedAnswer(e.target.id)
        //get the parent element and the iterate through the children to change the background color
        const parentElement = e.target.parentElement;
        const children = parentElement.children;
        for(let i = 0; i < children.length; i++){
            if(children[i].id !== e.target.id){
                children[i].style.backgroundColor = 'rgb(39, 76, 67)';
            }
            else {
                children[i].style.backgroundColor = 'rgb(26, 50, 44)';
            }
        }
    }

    return (

        <button id={id} className="answerButton" value={value} onClick={answerHandler}>{value[0]+"/"+value[1]}</button>
    );

}

function AnswerPanels({options: options,setSelectedAnswer}){

    let answerPanels = [];
    for(let i = 0; i < options.length; i++){

        answerPanels.push(<AnswerPanel key={i+'-'+options[i]} value={options[i]}  id={i} setSelectedAnswer={setSelectedAnswer} />);
        
    }
    return answerPanels;

}




function ProcedurePanel({pApertura, fractions, text}){

    let fractionsComponents = fractionComponentsGenerator({pApertura: pApertura, fractionsNumbers: fractions, colorType: 'multi' });
    



    return (
        <div className="procedurePanel">
            <div className='fractionsText'>{text}</div>
            <div className="fractions"> {fractionsComponents} </div>
        </div>
    );
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

