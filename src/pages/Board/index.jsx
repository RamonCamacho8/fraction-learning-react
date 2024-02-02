import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";

import { useLanguage } from "../../Context/LanguageContext.js";
import { ExercicesProvider } from "../../Context/ExercicesContext.js";

export default function Board({}) {

  return (
    <ExercicesProvider>
      <div className="main-container">
        <div className="board-container">
          <HeaderSection />
          <div className="content-section">
            <StatsSection />
            <ProblemSection />
          </div>
          <div className="bottom-section">
            <ButtonsSection />
            <HelpSection />
          </div>
        </div>
      </div>
    </ExercicesProvider>
  );
}
