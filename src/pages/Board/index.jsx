import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";

import { getExercicesByLevel } from "../../services/Excercices.js";
import { useLanguage } from "../../Context/LanguageContext.js";

import { useState } from "react";

export default function Board({}) {
  const { languageData } = useLanguage();
  const lang = languageData["board"];

  const exercises = getExercicesByLevel("easy");

  const [trys, setTrys] = useState(0);
  const [exerciceIndex, setExerciceIndex] = useState(0);
  const [currentExercice, setCurrentExercice] = useState(exercises[exerciceIndex]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(currentExercice.answer);

  const handleRevision = () => {
    if (selectedAnswer === null) {
      alert("No has seleccionado ninguna respuesta");
      return;
    } else if ( currentExercice.options[selectedAnswer][0] / currentExercice.options[selectedAnswer][1] === correctAnswer[0] / correctAnswer[1]) {
        alert("Correcto");
        setTrys(0);
        setExerciceIndex(exerciceIndex + 1);
        console.log(exerciceIndex);
        setCurrentExercice(exercises[exerciceIndex]);
        setSelectedAnswer(null);

    } else {
      alert("Incorrecto");
      setTrys(trys + 1);
    }


    
    
  };

  return (
    <div className="board">
      <HeaderSection />
      <ProblemSection
        setSelectedAnswer={setSelectedAnswer}
        setCorrectAnswer={setCorrectAnswer}
        currentExercice={currentExercice}
        setCurrentExercice={setCurrentExercice}
        exercices={exercises}
      />
      <ButtonsSection
        handleCheck={handleRevision}
      />
      <HelpSection/>
      <StatsSection text={lang.statsPanel} trys={trys} />
    </div>
  );
}
