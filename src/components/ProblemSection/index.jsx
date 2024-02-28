import "chart.js/auto";
import "./style.css";
import { useEffect, useState } from "react";
import { useExercices } from "../../Context/ExercicesContext";
import { useUser } from '../../Context/UserContext';
import PieFraction from "../../lib/ui/Fractions/PieFraction.jsx";
import NumericFraction from "../../lib/ui/Fractions/NumericFraction.jsx";
import RadioInput from "../../lib/ui/Buttons/RadioInput.jsx";

function ProblemSection() {
  const {userData} = useUser();

  return (
    <>
      <ProcedurePanel hasOpenness={userData.personality.openness}/>
      <h4>Elige la respueta correcta:</h4>
      <ResultPanel />
    </>
  );
}

function ResultPanel() {

  const { currentExercice, setSelectedAnswer } = useExercices();
  const answerOptions = currentExercice.options;

  return (
      <section className="answers"> {answerOptions.map((option, index) => {
        return (
          <RadioInput key={index + "-" + option} value={option} id={index} setSelectedAnswer={setSelectedAnswer} />
        );
      })} </section>
  );
}

function ProcedurePanel({hasOpenness}) {
  
  
  
  const { currentExercice } = useExercices();
  let fractions = currentExercice.fractions;
  let fractionsComponents = fractionComponentsGenerator({
    hasOpenness: hasOpenness,
    fractionsNumbers: fractions,
    colorType: "multi",
  });


  return (
    <section className="exercices">
      {fractionsComponents}
    </section>
  );
}

//Functions for fraction components
function colorSelector({ colorOption }) {
  const color = colorOption || "multi";
  const definedColors = [
    "rgb(255, 99, 132)",
    "rgb(255, 205, 86)",
    "rgb(54, 162, 235)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
  ];
  switch (color) {
    case "mono":
      return "rgb(39, 76, 67)";
    case "multi":
      return definedColors[Math.floor(Math.random() * definedColors.length)];
    default:
      return "rgb(39, 76, 67)";
  }
}

function fractionComponentSelector({ hasOpenness }) {

  switch (hasOpenness) {
    case true:
      return PieFraction;
    case false:
      return NumericFraction;
    default:
      return NumericFraction;
  }
}

function fractionComponentsGenerator({
  hasOpenness,
  fractionsNumbers,
  colorType = "multi",
}) {
  let Component = fractionComponentSelector({ hasOpenness: hasOpenness });
  let fractionsComponents = [];

  fractionsComponents = fractionsNumbers.map((fraction, index) => 
      { 
        if (index !== fractionsNumbers.length - 1) 
          return ( <>
            <Component
              key={`${index} + ${fraction[0]}/${fraction[1]}`}
              numerador={fraction[0]}
              denominador={fraction[1]}
              color={colorSelector({ colorOption: colorType })}
            />
            <div key={`${index} + symbol`} className="sum">+</div>
          </>)

        return(
          <Component
            key={`${index} + ${fraction[0]}/${fraction[1]}`}
            numerador={fraction[0]}
            denominador={fraction[1]}
            color={colorSelector({ colorOption: colorType })}
          />
        )
      }
  )

  return fractionsComponents;
}

export default ProblemSection;
