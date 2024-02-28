import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Home () {
    const navigate = useNavigate();

    
    useEffect(() => {
        navigate("/form");
    }
    , []);
    

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home;
