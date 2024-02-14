import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import Board from "./pages/Board";
import Test from "./pages/Test";
import Form from "./pages/Form";

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
              <Route path="/form" element={<Form />} />
            </Routes>

          </PersonalityProvider>
        </LanguageProvider>
      </StatsProvider>
    </UserProvider>
  );
}

export default App;
