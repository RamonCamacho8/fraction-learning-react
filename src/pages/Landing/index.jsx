import React from "react";
import "./style.css";


import { useUser } from "../../Context/UserContext";
import { addData, updateData } from "../../Controllers/dataFetch";
import { useState, useEffect, useRef } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
import { uploadAudios  } from "../../services/CloudStorage";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Landing = () => {

  const navigate = useNavigate();
  const questions = [{
    name : "question-1",
    question: "¿Qué es lo que te motiva?"
  },
  {
    name : "question-2",
    question: "¿Cuál es tu materia favorita? ¿Por qué?"
  },
  {
    name : "question-3",
    question: "¿Cuál es tu deporte favorito? ¿Por qué?"
  }
  ]

  const ref = useRef(null);
  const {userData, setUserData}
   = useUser();
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [userAudios, setUserAudios] = useState({});
  const [infoButtonStatus, setInfoButtonStatus] = useState('standby');
  const [continueButtonStatus, setContinueButtonStatus] = useState('standby');

  useEffect(() => {
    getMicrophonePermission(setPermission, setStream);
    
    const questionsData = questions.map((question) => question.name);
    const areSendedData = questionsData.reduce((acc, question) => {
      acc[question] = null;
      return acc;
    }, {});

    setUserAudios({
      ...userAudios,
      ...areSendedData
    });


  }, []);

  const registerInformation = async (e) => {
    

    e.preventDefault();
    e.target.disabled = true;   
    setInfoButtonStatus('loading'); 
    await addData(userData).then((data) => {
      setUserData({...userData, userId: data.id});
      setInfoButtonStatus('done');
    });
  };


  const handleContinue = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setContinueButtonStatus('loading');
    await uploadAudios(userAudios, userData.userId).then(() => {
      setContinueButtonStatus('done');
    });
    navigate("/board");
  }

  return (
    
      <main className="landing">
        <header>
          <h1>FractionLearning!</h1>
        </header>
        {/*  <nav></nav> */}
        <section>
          <Accordion  defaultActiveKey="0">
            <Accordion.Item as={'article'} eventKey="0">
              <Accordion.Header>Instrucciones</Accordion.Header>
              <Accordion.Body className="section-content">
              <p>
                Introduce tus datos personales en la sección <span>"Información del estudiante"</span>.
              </p>
              <p>
                Contesta a las preguntas de la sección <span>"Preguntas"</span> con la mayor
                sinceridad posible.
              </p>
              <p>Para ello:</p>
              <ol>
                <li>Lee la pregunta.</li>
                <li>Cuando tengas lista tu respuesta, presiona <span>"Grabar"</span>.</li>
                <li>Responde en voz alta la pregunta.</li>
              </ol>
              <p>Cuando termines, presiona <span>"Continuar"</span>. O si lo deseas, puedes regrabar tus respuestas.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <article >
            <h2>Información del estudiante</h2>
            <div  className='section-content'>
              <form>
                <div className="inputs">
                  <div>
                    <label htmlFor="first"> Nombre: </label>
                    <input
                      id="first"
                      type="text"
                      value={userData.firstName}
                      onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                      required
                      disabled={userData.userId}
                    />
                  </div>
                  <div>
                    <label htmlFor="last"> Apellido: </label>
                    <input
                      id="last"
                      type="text"
                      value={userData.lastName}
                      onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                      required
                      disabled={userData.userId}
                    />
                  </div>
                  <div>
                    <label htmlFor="birth"> Fecha de nacimiento: </label>
                    <input
                      id="birth"
                      type="date"
                      selected={userData.birthDate}
                      onChange={e => setUserData({...userData, birthDate: e.target.value})}
                      required
                      disabled={userData.userId}
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" > Género: </label>
                    <select id="genre" onChange={e => setUserData({...userData, genre: e.target.value}) } required disabled={userData.userId}>
                      <option value="">Selecciona una opción</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={registerInformation} 
                  disabled={(!(userData.firstName && userData.lastName && userData.birthDate && userData.genre && !userData.userId))} >
                  
                  {
                    infoButtonStatus === 'standby' ? 'Confirmar Datos.' : 
                    infoButtonStatus === 'loading' ? <i className="fa fa-spinner fa-spin"></i> :
                    infoButtonStatus === 'done' ? <i className="fa-solid fa-check"></i> : ''
                  }
                
                </button>
              </form>
            </div>
          </article>
          <article ref={ref}>
            <h2>Preguntas</h2>
            <div className='section-content' >
              <ul className="questions">
                {questions.map((question) => {
                  return (
                    <li key={question.name}>
                      <span>{question.question}</span>
                      <AudioRecorder
                        stream={stream}
                        permission={permission}
                        audioName={question.name}
                        disabled = { (userData.userId && continueButtonStatus === 'standby') ? false : true}
                        userId = {userData.userId}
                        setUserAudios={setUserAudios}
                        userAudios={userAudios}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>
          <button
            className="submit"
            type="submit"
            onClick={handleContinue}
            disabled={!( userData.firstName && userData.lastName && userData.birthDate && userData.genre && userData.userId && Object.keys(userAudios).every((audio) => userAudios[audio] !== null)) }
          >
            {
              continueButtonStatus === 'standby' ? 'Continuar' : 
              continueButtonStatus === 'loading' ? <i className="fa fa-spinner fa-spin"></i> :
              continueButtonStatus === 'done' ? <i className="fa-solid fa-check"></i> : ''
            }
          </button>
         {/*  <button onClick={() => {}}>
            <i className="fa fa-spinner fa-beat"></i>
          </button> */}
        </section>
      </main>
  );
};

export default Landing;
