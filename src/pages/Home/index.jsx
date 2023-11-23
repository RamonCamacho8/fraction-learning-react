import "./style.css";
import { useState } from "react";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";
import AudioRecorder from "../../components/AudioRecorder";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

import LanguageSelector from "../../components/LanguageSelector";





function Home() {

  const {setUserName} = useUser();

  const {languageData} = useLanguage();
  const [instruction, setInstruction] = useState(0);

  const homeTraduction = languageData['home'];

  const navigate = useNavigate();

  function Login() {

    const handleChange = (e) => {
      setUserName(e.target.value);
    };
  
    return (
      <div className="login">
        <h3>{homeTraduction.studentHolder.title}</h3>
        <input
          type="text"
          placeholder={homeTraduction.studentHolder.content}
          onChange={handleChange}
        />
      </div>
    );
  }

  const InstructionsPanel = () => {

    return(
      <div className="instructions">
          
          <h3>{homeTraduction.instruction}</h3>
          <h4>{homeTraduction.instructions[instruction].content}</h4>

      </div>
    )
  }
  

  return (
    <div className="container">
      <div className="mainPanel">

        <h1>{homeTraduction.welcome}</h1>
        <Login />
        <LanguageSelector />
        <InstructionsPanel/>
        <AudioRecorder setInstruction={setInstruction} />

        <button onClick={() => {navigate('/board')}} >Continuar</button>
      </div>
    </div>
  );
}


export default Home;
