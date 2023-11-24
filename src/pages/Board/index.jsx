import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";

import { getExercicesByLevel } from "../../services/Excercices.js";
import { useLanguage } from "../../Context/LanguageContext.js";

import { useState } from "react";

import { ExercicesProvider } from "../../Context/ExercicesContext.js";

export default function Board({}) {
  const { languageData } = useLanguage();
  const lang = languageData["board"];

  const exercises = getExercicesByLevel("easy");

  const [trys, setTrys] = useState(0);



  return (
    <div className="board">
      <HeaderSection />

      <ExercicesProvider>
        <ProblemSection />

        <ButtonsSection  />

        <StatsSection text={lang.statsPanel} trys={trys} />
        
      </ExercicesProvider>
      <HelpSection />

      
    </div>
  );
}
