import AudioComponent from "../../components/AudioComponent";
import "./style.css";
import { getHomeObject } from "../../services/Language.js";
import { useState } from "react";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";
import AudioRecorder from "../../components/AudioRecorder";
import { useNavigate } from "react-router-dom";

import LanguageSelector from "../../components/LanguageSelector";





function Home({setUserName, setLanguageState}) {


  const {language,languageData} = useLanguage();
  const {openess, neuroticism} = usePersonality();

  const navigate = useNavigate();

  const InstructionsPanel = () => {

  }
  

  return (
    <div className="container">
      <div className="mainPanel">
        <div className="title">
          <div>
            <h1>{languageData['home'].welcome}</h1>
          </div>
          <div>
            <LanguageSelector />
          </div>
          
        </div>

        <AudioRecorder/>
        <button onClick={() => {navigate('/board')}} >Continuar</button>
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

// function InstructionsPanel({ setApertura, setNeuroticismo, languageObject }) {

//   const buttons = languageObject.buttons;
//   let currentInstructions = languageObject.instructions.map((instruction) => {
//     return instruction.content;
//   });


//   const [currentInstructionNum, setCurrentInstructionNum] = useState(0);
  

//   const handleInstructionChange = (num) => {
//     setCurrentInstructionNum(num);
//   };

//   return (
//     <div className="instructions">

//       <h3>{languageObject.instruction}</h3>
//       <h4>{currentInstructions[currentInstructionNum]}</h4>

//       <AudioComponent
//         setApertura={setApertura}
//         setNeuroticismo={setNeuroticismo}
//         permissionText={buttons.permissions}
//         recordText={buttons.record}
//         recordAgainText={buttons.recordAgain}
//         stopText={buttons.stop}
//         sendText={buttons.send}
//         setInstruction={handleInstructionChange}
//       />
//     </div>
//   );
// }

export default Home;
