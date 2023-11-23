import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";

import { getBoardObject } from "../../services/Language.js";
import { getExercicesByLevel } from "../../services/Excercices.js";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";

import { useState } from "react";

export default function Board({}) {
  const { languageData } = useLanguage();
  const lang = languageData["board"];

  const exercises = getExercicesByLevel("easy");

  const [trys, setTrys] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleRevision = () => {
    setTrys(trys + 1);
  };

  return (
    <div className="board">
      <HeaderSection />
      <ProblemSection
        setSelectedAnswer={setSelectedAnswer}
        exercices={exercises}
      />
      <ButtonsSection
        selectedAnswer={selectedAnswer}
        handleCheck={handleRevision}
      />
      <HelpSection/>
      <StatsSection text={lang.statsPanel} trys={trys} />
    </div>
  );
}
