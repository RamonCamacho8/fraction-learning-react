import React from "react";
import "./style.css";

import { useUser, UserProvider } from "../../Context/UserContext";
import { addData, updateData } from "../../Controllers/dataFetch";
import { useState, useEffect, useRef } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
const Landing = () => {


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

  const { first, setFirst, last, setLast, age, setAge, genre, setGenre, id, setId } = useUser();
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [areSended, setAreSended] = useState({});

  useEffect(() => {
    getMicrophonePermission(setPermission, setStream);

    const questionsData = questions.map((question) => question.name);
    const areSendedData = questionsData.reduce((acc, question) => {
      acc[question] = false;
      return acc;
    }, {});
    setAreSended({
      ...areSended,
      ...areSendedData
    });

  }, []);

  const registerInformation = async () => {
    

    console.log(first, last, age, genre);
    
    await addData({ first, last, age, genre }).then((data) => {
      setId(data.id);      
    });

  };

  return (
    <UserProvider>
      <main className="landing">
        <header>
          <h1>Tecnologico Nacional de México Campus Culiacán</h1>
          <h2>Bienvenido a Fraction Learning</h2>
        </header>
        <section>
          <article className={ id ? `done` : null }>
            <h2>Información del estudiante</h2>
            <div  className={`section-content ${id ? 'done' : 'current'}`  }>
              <form>
                <div className="inputs">
                  <div>
                    <label htmlFor="first"> Nombre: </label>
                    <input
                      id="first"
                      type="text"
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      required
                      disabled={id}
                    />
                  </div>
                  <div>
                    <label htmlFor="last"> Apellido: </label>
                    <input
                      id="last"
                      type="text"
                      value={last}
                      onChange={(e) => setLast(e.target.value)}
                      required
                      disabled={id}
                    />
                  </div>
                  <div>
                    <label htmlFor="age"> Edad: </label>
                    <input
                      id="age"
                      type="number"
                      min={9}
                      max={100}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      disabled={id}
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" > Género: </label>
                    <select id="genre" onChange={e => setGenre(e.target.value)} required disabled={id}>
                      <option value="">Selecciona una opción</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <button type="button" onClick={registerInformation} disabled={
                  (!(first && last && age && genre && !id))
                } >{ id ? `Registro exitoso.` : `Confirmar datos`}</button>
              </form>
            </div>
          </article>
          <article ref={ref} className="instructions">
            <h2>Instrucciones</h2>
            <div className="section-content">
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
            </div>
          </article>
          <article>
            <h2>Preguntas</h2>
            <div className={`section-content ${ ((id && Object.keys(areSended).every((key) => areSended[key] === true))) ? 'done' : 'current'}`} >
              <ul className="questions">
                {questions.map((question) => {
                  return (
                    <li key={question.name}>
                      <span>{question.question}</span>
                      <AudioRecorder
                        stream={stream}
                        permission={permission}
                        audioName={question.name}
                        areSended={areSended}
                        disabled = {id ? false : true}
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
            onClick={registerInformation}
            disabled={(!(first && last && age))}
          >
            Continuar
          </button>
          <button onClick={() => {
            ref.current.scrollIntoView({ behavior: "smooth" });
            }}>
            Print

          </button>
        </section>
      </main>
    </UserProvider>
  );
};

export default Landing;
