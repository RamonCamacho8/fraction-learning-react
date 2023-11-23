import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Test from "./pages/Test";

import { PersonalityProvider } from "./Context/PersonalityContext";
import { LanguageProvider } from "./Context/LanguageContext";
import { UserProvider } from "./Context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [pApertura, setApertura] = useState(true);
  const [pNeuroticismo, setNeuroticismo] = useState(true);
  const [userName, setUserName] = useState("");

  const [language, setLanguage] = useState("es");


  return (
    <UserProvider>
      <LanguageProvider>
        <PersonalityProvider>

          <Routes>
            <Route path="/" element={<Home setUserName={setUserName} />} />
            <Route path="/board" element={ <Board /> } />
            <Route path="/test" element={<Test />} />
          </Routes>

        </PersonalityProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
