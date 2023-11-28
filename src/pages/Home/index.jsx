import "./style.css";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";
import { getPersonality, getPersonality_v2 } from "../../services/Personality";
import AudioRecorder from "../../components/AudioRecorder";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { getMicrophonePermission } from "../../utils/recordAudio.js";
import LanguageSelector from "../../components/LanguageSelector";

function Home() {
  const { userName, setUserName } = useUser();

  const { languageData } = useLanguage();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const { openness, neuroticism } = usePersonality();
  const { setOpenness, setNeuroticism } = usePersonality();

  const homeTraduction = languageData["home"];

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
    return (
      <div className="instructions">
        <h3>{homeTraduction.instruction}</h3>
        <p></p>
        <ol>
          {homeTraduction.instructions.map((instruction, index) => {
            return <li key={`instruction-${index}`}>{instruction}</li>;
          })}
        </ol>
      </div>
    );
  };

  async function handleContinue() {
    let response = await getPersonality_v2();

    let neuroticism_ = response.neuroticism === "Si" ? true : false;
    let openness_ = response.openness === "Si" ? true : false;
    console.log(neuroticism_, openness_);

    setNeuroticism(neuroticism_);
    setOpenness(openness_);
    console.log(response.openness, response.neuroticism);
    console.log(openness, neuroticism);
    navigate("/board");
  }

  return (
  <IconContext.Provider value={{ style: { verticalAlign: 'top'}, size: '2em' }}>    <div className="container">
      <div className="mainPanel">
        <h1 className="welcome">{homeTraduction.welcome}</h1>
        <Login />
        <LanguageSelector />
        <InstructionsPanel />
        {permission ? null : (
          <button
            className="permissionsButton"
            onClick={() => {
              getMicrophonePermission(setPermission, setStream);
            }}
          >
            {homeTraduction.buttons.permissions
            }
          </button>
        )}
        <div>
          {homeTraduction.questions.map((question, index) => {
            return (
              <div key={`question-${index}`} className="question-record">
                <div className="question-text" key={index}>{question}</div>
                <AudioRecorder
                  key={`AudioRecorder-${index}`}
                  audioName={`question${index}`}
                  stream={stream}
                  permission={permission}
                />
              </div>
            );
          })}
        </div>

        <button className="continue-button" onClick={handleContinue}>Continuar</button>
        
      </div>
    </div>
  </IconContext.Provider>
  );
}

export default Home;
