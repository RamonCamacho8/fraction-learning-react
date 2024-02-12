import "./style.css";

import StatsSection from "../../components/StatsSection";
import HeaderSection from "../../components/HeaderSection";
import HelpSection from "../../components/HelpSection";
import ProblemSection from "../../components/ProblemSection";
import ButtonsSection from "../../components/ButtonsSection";
import { ExercicesProvider } from "../../Context/ExercicesContext.js";
import { useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
export default function Board({}) {

  const { userData } = useUser();
  /* const navigate = useNavigate();

   useEffect(() => {
    if (!userData.userId) {
      navigate("/");
    }
  }, [userData]); 
   */

  useEffect(() => {
    console.log('board',userData)
  }, []);

  return (
      <ExercicesProvider>
        <main className="main-container">
          <div className="board-container">
            <HeaderSection />
            <StatsSection />
            <h4>Resuelve la siguiente suma:</h4>
            <ProblemSection />
            <ButtonsSection />
            <HelpSection />
          </div>
        </main>
      </ExercicesProvider>
  );
}
