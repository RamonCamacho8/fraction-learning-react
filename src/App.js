import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';

import Board from './pages/Board';
import Home from './pages/Home'

function App() {

  const [pApertura, setApertura] = useState(false);

  return (
      
      <Routes>
        <Route path="/" element={<Home pApertura={pApertura} setApertura={setApertura}/>} />
        <Route path="/board" element={<Board pApertura= {pApertura} />} />
      </Routes>
    
  );
}

export default App;
