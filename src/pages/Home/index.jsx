import "./style.css";
import { useState } from "react";
import { IconContext } from "react-icons";
import { useLanguage } from "../../Context/LanguageContext.js";
import { usePersonality } from "../../Context/PersonalityContext.js";
import { getPersonality_v2 } from "../../services/Personality";
import AudioRecorder from "../../components/AudioRecorder";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { getMicrophonePermission } from "../../utils/recordAudio.js";
import LanguageSelector from "../../components/LanguageSelector";

function Home() {
  //const { userName, setUserName } = useUser();
  const [userInfo, setUserInfo] = useState({});
  const [firstName, setFirstName] = useState("");
  const { languageData } = useLanguage();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const { openness, neuroticism } = usePersonality();
  const { setOpenness, setNeuroticism } = usePersonality();

  const homeTraduction = languageData["home"];

  const navigate = useNavigate();


  const handleSubmission = (event) => {
    console.log("A name was submitted: " + firstName);
  };

  function Login() {
    return (  
      <form onSubmit={handleSubmission} >

        <label htmlFor="firstName" >Nombre</label>
        <input id="firstName" name="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}  required />
        <br></br>

        <label htmlFor="lastName" >Apellido(s)</label>
        <input id="lastName" name="lastName" type="text" />
        <br></br>

        <label htmlFor="age" >Edad</label>
        <input id="age" name="age" type="number" />
        <br></br>

        <button type="submit">Ingresar</button>

      </form>
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
    <IconContext.Provider
      value={{ style: { verticalAlign: "top" }, size: "2em" }}
    >
      <div className="home-container">
        <div className="main-panel">
          <h1 className="welcome-title">{homeTraduction.welcome}</h1>
          <Login />
          <LanguageSelector />
          <InstructionsPanel />
          {permission ? null : (
            <button
              className="permission-button"
              onClick={() => {
                getMicrophonePermission(setPermission, setStream);
              }}
            >
              {homeTraduction.buttons.permissions}
            </button>
          )}
          <div className="questions-section">
            {homeTraduction.questions.map((question, index) => {
              return (
                <div key={`question-${index}`} className="question-record">
                  <div className="question-text" key={index}>
                    {question}
                  </div>
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

          <button className="continue-button" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Home;
