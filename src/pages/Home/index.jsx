import "./style.css";
import { useState } from "react";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";
import AudioRecorder from "../../components/AudioRecorder";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { getMicrophonePermission } from "../../utils/recordAudio.js";
import LanguageSelector from "../../components/LanguageSelector";





function Home() {

  const {userName,setUserName} = useUser();

  const {languageData} = useLanguage();
  const [instruction, setInstruction] = useState(0);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);

  const homeTraduction = languageData['home'];

  const navigate = useNavigate();

  function Login() {

    return (
      <div className="login">
        <h3>{homeTraduction.studentHolder.title}</h3>
        <input
          type="text"
          placeholder={homeTraduction.studentHolder.content}
          onChange={() => setUserName()}
          value={userName}
        />
      </div>
    );
  }

  const InstructionsPanel = () => {

    return(
      <div className="instructions">
          
          <h3>{homeTraduction.instruction}</h3>
          <p></p>
          <ol>
            { 
              homeTraduction.instructions.map((instruction,index) => {
                return <li key={index}>{instruction}</li>
              })
            }
          </ol>
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
        {permission ? null : <button onClick={() => {getMicrophonePermission(setPermission,setStream)}} >{homeTraduction.buttons.permissions}</button>}
        {
          homeTraduction.questions.map((question,index) => {
            return <div className="question-record">
              <p key={index}>{question}</p>
              <AudioRecorder audioName={`question${index}`} stream={stream} permission={permission} />
              </div>
          })
        }

        <button onClick={() => {navigate('/board')}} >Continuar</button>
      </div>
    </div>
  );
}


export default Home;
