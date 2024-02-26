import React from "react";
import "./style.css";


import { useUser } from "../../Context/UserContext";
import { addData, updateData } from "../../Controllers/dataFetch";
import { useState, useEffect } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
import { uploadAudios  } from "../../services/CloudStorage";
import { useNavigate } from "react-router-dom";
import {  getPersonality_v3 } from "../../services/Personality";
import { stringNormalizer, isDateValid, nameNormalizer } from "../../utils/formValidations";
import CustomAccordion from "../../lib/ui/CustomAccordion";

const questions = [{
  name : "question-1",
  question: "¿Qué es lo que te motiva y porqué?"
},
{
  name : "question-2",
  question: "¿Cuál es tu materia favorita y porqué?"
},
{
  name : "question-3",
  question: "¿Qué actividad te gusta realizar más? ¿Por qué?"
}
]

const minDate = '1931-12-31';
const maxDate = '2015-12-31';

const Form = () => {

  const navigate = useNavigate();
  const {userData, setUserData} = useUser();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    genre: '',
  });



  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [userAudios, setUserAudios] = useState({});

  const [infoButtonClicked, setInfoButtonClicked] = useState(false);
  const [infoButtonStatus, setInfoButtonStatus] = useState('standby');

  const [continueButtonClicked, setContinueButtonClicked] = useState(false);
  const [continueButtonStatus, setContinueButtonStatus] = useState('standby');

  useEffect(() => {
    getMicrophonePermission(setPermission, setStream);
    
    const questionsData = questions.map((question) => question.name);
    const areSendedData = questionsData.reduce((acc, question) => {
      acc[question] = null;
      return acc;
    }, {});
    setUserAudios({
      ...areSendedData
    });

  }, []);

  const handleRecord = () => {
    
  };

  const registerInformation = async (e) => {

    e.preventDefault();
    
    if(!isDateValid(userInfo.birthDate, minDate, maxDate)){
      alert('La fecha de nacimiento no es válida');
      setUserInfo(prev => ({...prev, birthDate: ''}));
      return;
    }

    setInfoButtonStatus('loading');
    e.target.disabled = true;
    setInfoButtonClicked(true);

    setUserData(prev => ({...prev, userInfo: {...userInfo}}));
  };

  useEffect(() => {
    
    if(infoButtonClicked)
      {
        addData(userData).then((data) => {
          setUserData(prev => ({...prev, userId: data.id}));
          setInfoButtonStatus('done');
          console.log(data.id)
        });
        setInfoButtonClicked(false);
      }

  }, [infoButtonClicked]);


  const handleUserInfoChange = (e) => {
    let value = e.target.value;
    if(e.target.id === 'firstName' || e.target.id === 'lastName'){
      value = stringNormalizer(value);
      value = nameNormalizer(value);
    }
    setUserInfo(prev => ({...prev, [e.target.id]: value}));
  }


  const handleContinue = async (e) => {
    e.preventDefault();


    /* e.target.disabled = true;
    setContinueButtonStatus('loading'); 

    let audiosObject = {};
    

    const urls = await uploadAudios(userAudios, userData.userId);
    audiosObject.audios = urls;
    const data =  await getPersonality_v3(audiosObject);

  
    setUserData(prev => ({...prev, personality: data.personality}));
    updateData(userData, userData.userId);
    setContinueButtonStatus('done');
    
    navigate("/board"); */
  }

  return (
    
      <main className="landing">
        <header>
          <h1>FractionLearning!</h1>
        </header>
        {/*  <nav></nav> */}
        <section>
          <CustomAccordion title="Instrucciones" >
              <p>
                Introduce tus datos en la sección <span>"Información del estudiante"</span>.
              </p>
              <p>
                Después, Responde a las preguntas de la sección <span>"Preguntas"</span>. 
              </p>
              <p>Para ello:</p>
              <ol>
                <li>Lee la pregunta.</li>
                <li>Cuando tengas lista tu respuesta, presiona <span>"Grabar"</span>.</li>
                <li>Responde en voz baja a la pregunta. </li>
                <li>Presiona <span>"Detener"</span> cuando termines.</li>
              </ol>
              <p>Cuando termines, presiona <span>"Continuar"</span>. O si lo deseas, puedes regrabar tus respuestas.</p>
          </CustomAccordion>
          <article >
            <h2>Información del estudiante</h2>
            <div  className='section-content'>
              <form>
                <div className="inputs">
                  <div>
                    <label htmlFor="firstName"> Nombre: </label>
                    <input
                      id="firstName"
                      type="text"
                      value={userInfo.firstName}
                      onChange={handleUserInfoChange}
                      required
                      disabled={userData.userId}
                      minLength={2}
                      maxLength={25}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName"> Apellido: </label>
                    <input
                      id="lastName"
                      type="text"
                      value={userInfo.lastName}
                      onChange={handleUserInfoChange}
                      minLength={2}
                      maxLength={25}
                      required
                      disabled={userData.userId}
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDate"> Fecha de nacimiento: </label>
                    <input
                      id="birthDate"
                      type="date"
                      selected={userInfo.birthDate}
                      min={minDate}
                      max={maxDate}
                      value={userInfo.birthDate}
                      onChange={handleUserInfoChange}
                      required
                      disabled={userData.userId}
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" > Género: </label>
                    <select id="genre" onChange={handleUserInfoChange} required disabled={userData.userId}>
                      <option value="">Selecciona una opción</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={registerInformation} 
                  disabled={(!( userInfo.firstName && userInfo.lastName && 
                                userInfo.birthDate && userInfo.genre && !userData.userId))} >
                  
                  {
                    infoButtonStatus === 'standby' ? 'Confirmar Datos.' : 
                    infoButtonStatus === 'loading' ? <i className="fa fa-spinner fa-spin"></i> :
                    infoButtonStatus === 'done' ? <i className="fa-solid fa-check"></i> : ''
                  }
                
                </button>
              </form>
            </div>
          </article>
          <article>
            <h2>Preguntas</h2>
            <div className='section-content' >
              <ul className="questions">
                {questions.map((question) => {
                  return (
                    <li key={question.name} id={question.name}>
                      <span>{question.question}</span>
                      <AudioRecorder
                        key={question.name}
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
        </section>
      </main>
  );
};

export default Form;
