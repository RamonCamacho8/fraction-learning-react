import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import Board from './pages/Board';
import Home from './pages/Home';
import Test from './pages/Test';

import { PersonalityContext } from './Context/PersonalityContext';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [pApertura, setApertura] = useState(true);
  const [pNeuroticismo, setNeuroticismo] = useState(true);
  const [userName, setUserName] = useState('');
  const [lang, setLang] = useState('es');


  const [aperture, setAperture] = useState(false);
  const [neuroticism, setNeuroticism] = useState(false);


  return (

    <Routes>
      <PersonalityContext.Provider value = {{aperture: [aperture, setAperture], neuroticism: [neuroticism, setNeuroticism]}} /> 
      <Route path="/" element={
        <Home
          setApertura={setApertura}
          setNeuroticismo={setNeuroticismo}
          setUserName={setUserName}
          language={lang}
          setLanguageState={setLang}

        />} />
      <Route path="/board" element={
        <Board pApertura={pApertura} pNeuroticismo={pNeuroticismo} userName={userName} language={lang}
        />} />
      <Route path="/test" element={
        <Test />
      }
      />

    </Routes>

  );
}

export default App;
