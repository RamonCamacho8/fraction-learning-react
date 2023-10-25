import {Routes, Route} from 'react-router-dom';

import Board from './pages/Board';
import Home from './pages/Home'

function App() {
  return (
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/board" element={<Board/>} />
      </Routes>
    
  );
}

export default App;
