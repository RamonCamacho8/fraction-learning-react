import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import Board from './pages/Board';
import Home from './pages/Home';
import Test from './pages/Test';

import { PersonalityProvider } from './Context/PersonalityContext';
import { LanguageProvider } from './Context/LanguageContext';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [pApertura, setApertura] = useState(true);
  const [pNeuroticismo, setNeuroticismo] = useState(true);
  const [userName, setUserName] = useState('');

  const [language, setLanguage] = useState('es');
  const [aperture, setAperture] = useState(true);
  const [neuroticism, setNeuroticism] = useState(true);


  return (

    <LanguageProvider>
      <PersonalityProvider>
        <Routes>
          <Route path="/" element={
            <Home
              setApertura={setApertura}
              setNeuroticismo={setNeuroticismo}
              setUserName={setUserName}
              language={language}
              setLanguageState={setLanguage}

            />} />
          <Route path="/board" element={
            <Board pApertura={pApertura} pNeuroticismo={pNeuroticismo} userName={userName} language={language}
            />} />
          <Route path="/test" element={
            <Test />
          }
          />
        </Routes>
      </PersonalityProvider>
    </LanguageProvider>

  );
}

export default App;
