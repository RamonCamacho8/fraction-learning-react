import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import Board from './pages/Board';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [pApertura, setApertura] = useState(false);
  const [pNeuroticismo, setNeuroticismo] = useState(true);
  const [userName, setUserName] = useState('');
  const [lang, setLang] = useState('es');
  
  

  return (
      
      <Routes>
        <Route path="/" element={
        <Home 
          setApertura={setApertura} 
          setNeuroticismo={setNeuroticismo} 
          setUserName={setUserName}
          language ={lang}
          setLanguageState={setLang}

        />} />
        <Route path="/board" element={
        <Board pApertura= {pApertura} pNeuroticismo={pNeuroticismo} userName = {userName}  language = {lang}
        />} />
      </Routes>
    
  );
}

export default App;
