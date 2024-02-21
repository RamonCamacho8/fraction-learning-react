import React from "react";
import "./style.css";


import { useUser } from "../../Context/UserContext";
import { addData, updateData, normalizeString } from "../../Controllers/dataFetch";
import { useState, useEffect, useRef } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
import { uploadAudios  } from "../../services/CloudStorage";
import { useNavigate } from "react-router-dom";
import {  getPersonality_v3 } from "../../services/Personality";
import CustomAccordion from "../../lib/ui/CustomAccordion";

const Form = () => {

  const navigate = useNavigate();
  
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

  const ref = useRef(null);
  const {userData, setUserData} = useUser();
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

    if(!isDateValid(userData.birthDate)){
      setUserData(prev => ({...prev, birthDate: ''}));
      setInfoButtonStatus('standby');
      e.target.disabled = false;
      return;
    }
    
    


    

    addData(userData).then((data) => {
      setUserData(prev => ({...prev, userId: data.id}));
      setInfoButtonStatus('done');
    });


  };

  const isDateValid = (date) => {

    const birthDate = new Date(date);
    const mixDate = new Date('1931-12-31');
    const maxDate = new Date('2011-12-31');

    if(birthDate < mixDate || birthDate > maxDate){
      alert('La fecha de nacimiento no es válida');
      return false;
    }
    return true;
    
  }


  const handleInputNameChange = (e, key) => {

    let string = e.target.value;
    //Verify if the string contains numbers
    if(string.match(/\d+/g)){
      string = string.replace(/\d+/g, '');
    }
    //The string not contains any special character
    if(string.match(/[^a-zA-Z\s]/g)){
      string = string.replace(/[^a-zA-Z\s]/g, '');
    }

    //The String only contains a space just between words
    if(string.match(/\s{2,}/g)){
      string = string.replace(/\s{2,}/g, ' ');
    }
    //If the first character is a space, remove it
    if(string.charAt(0) === ' '){
      string = string.slice(1);
    }
    
    setUserData({...userData, [key]: normalizeString(string)});
  }


  const handleContinue = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setContinueButtonStatus('loading'); 

    let audiosObject = {};
    

    const urls = await uploadAudios(userAudios, userData.userId);
    //console.log(urls);
    audiosObject.audios = urls;
    const personality =  await getPersonality_v3(audiosObject);
    console.log(personality);
    setUserData(prev => ({...prev, personality: personality}));
    updateData(userData, userData.userId);
    setContinueButtonStatus('done');
    

    navigate("/board");
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
                    <label htmlFor="first"> Nombre: </label>
                    <input
                      id="first"
                      type="text"
                      value={userData.firstName}
                      onChange={(e) => handleInputNameChange(e, 'firstName')}
                      required
                      disabled={userData.userId}
                      minLength={2}
                      maxLength={25}
                    />
                  </div>
                  <div>
                    <label htmlFor="last"> Apellido: </label>
                    <input
                      id="last"
                      type="text"
                      value={userData.lastName}
                      onChange={(e) => handleInputNameChange(e, 'lastName')}
                      minLength={2}
                      maxLength={25}
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
                      min='1931-12-31'
                      max='2011-12-31'
                      value={userData.birthDate}
                      pattern="\d{2}-\d{2}-\d{4}"
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
                    <li id={question.name}>
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
        </section>
      </main>
  );
};

export default Form;
