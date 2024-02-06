import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Landing from "./pages/Landing";
import BoardV2 from "./pages/BoardV2";

import { PersonalityProvider } from "./Context/PersonalityContext";
import { LanguageProvider } from "./Context/LanguageContext";
import { UserProvider } from "./Context/UserContext";
import { StatsProvider } from "./Context/StatsContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <UserProvider>
      <StatsProvider>
      <LanguageProvider>
        <PersonalityProvider>

          <Routes>
            {/* <Route path="/" element={<Home  />} /> */}
            <Route path="/board" element={ <Board /> } />
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Landing />} />
            <Route path="/boardv2" element={<BoardV2 />} />
          </Routes>

        </PersonalityProvider>
      </LanguageProvider>
      </StatsProvider>
    </UserProvider>
  );
}

export default App;
