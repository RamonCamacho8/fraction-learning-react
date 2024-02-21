import "chart.js/auto";
import "./style.css";
import { useState } from "react";
import { useLanguage } from "../../Context/LanguageContext";
import { usePersonality } from "../../Context/PersonalityContext";
import { useExercices } from "../../Context/ExercicesContext";
import { useUser } from '../../Context/UserContext';
import PieFraction from "../../lib/ui/Fractions/PieFraction.jsx";
import NumericFraction from "../../lib/ui/Fractions/NumericFraction.jsx";
import RadioInput from "../../lib/ui/Buttons/RadioInput.jsx";

function ProblemSection() {
  return (
    <>
    
      <ProcedurePanel />
      <h4>Elige la respueta correcta:</h4>
      <ResultPanel />
    </>
  );
}

function ResultPanel() {
  const answerComponents = AnswersPanel();

  return (
      <section className="answers"> {answerComponents} </section>
  );
}

function ProcedurePanel() {
  const { userData } = useUser();
  console.log(userData);
  let hasOpenness = userData.personality.openness.toLowerCase() === 'si' ? true : false;
  console.log(hasOpenness);
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

function AnswersPanel() {
  const { currentExercice, setSelectedAnswer } = useExercices();
  const answerOptions = currentExercice.options;

  return answerOptions.map((option, index) => {
    return (
      <RadioInput key={index + "-" + option} value={option} id={index} setSelectedAnswer={setSelectedAnswer} />
    );
  });

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
