import AudioRecorder from "../../components/HomeComponents/AudioRecorder";
import "./style.css";
import { getHomeObject } from "../../services/getText.js";
import { useState } from "react";

import LanguageSelector from "../../components/LanguageSelector.js";


let langObject = getHomeObject();

function Home({ setApertura, setNeuroticismo, setUserName, language, setLanguageState}) {

 
  const [languageObject, setLanguageObject] = useState(langObject);

  return (
    <div className="container">
      <div className="mainPanel">
        <div className="title">

          <div>
            <h1>{languageObject.welcome}</h1>
          </div>
          
          <div>
            <LanguageSelector language={language} setLanguageState={setLanguageState} setLanguageObject={setLanguageObject} />
          </div>
          
        </div>

        <Login setUserName={setUserName} languageObject={languageObject} />
        <InstructionsPanel
          setApertura={setApertura}
          setNeuroticismo={setNeuroticismo}
          languageObject={languageObject}
        />
      </div>
    </div>
  );
}

function Login({ setUserName, languageObject }) {
  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="login">
      <h3>{languageObject.studentHolder.title}</h3>
      <input
        type="text"
        placeholder={languageObject.studentHolder.content}
        onChange={handleChange}
      />
    </div>
  );
}

function InstructionsPanel({ setApertura, setNeuroticismo, languageObject }) {

  const buttons = languageObject.buttons;
  let currentInstructions = languageObject.instructions.map((instruction) => {
    return instruction.content;
  });


  const [currentInstructionNum, setCurrentInstructionNum] = useState(0);
  

  const handleInstructionChange = (num) => {
  
    setCurrentInstructionNum(num);
    
  };

  return (
    <div className="instructions">
      <h3>{languageObject.instruction}</h3>
      <h4>{currentInstructions[currentInstructionNum]}</h4>

      <AudioRecorder
        setApertura={setApertura}
        setNeuroticismo={setNeuroticismo}
        permissionText={buttons.permissions}
        recordText={buttons.record}
        recordAgainText={buttons.recordAgain}
        stopText={buttons.stop}
        sendText={buttons.send}
        setInstruction={handleInstructionChange}
      />
    </div>
  );
}

export default Home;
