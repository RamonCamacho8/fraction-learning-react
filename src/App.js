import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';

import Board from './pages/Board';
import Home from './pages/Home'

function App() {

  const [pApertura, setApertura] = useState(false);
  const [userName, setUserName] = useState('');

  return (
      
      <Routes>
        <Route path="/" element={<Home pApertura={pApertura} setApertura={setApertura} setUserName={setUserName} />} />
        <Route path="/board" element={<Board pApertura= {pApertura} userName = {userName}  />} />
      </Routes>
    
  );
}

export default App;
