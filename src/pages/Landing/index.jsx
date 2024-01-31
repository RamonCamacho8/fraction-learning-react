import React from "react";
import "./style.css";

import { useUser, UserProvider } from "../../Context/UserContext";
import { addDocument } from "../../services/Firestore";
import { addData } from "../../Controllers/dataFetch";
import { useState, useEffect } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
const Landing = () => {

  const { first, setFirst, last, setLast, age, setAge, genre, setGenre } = useUser();
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [areSended, setAreSended] = useState({});

  useEffect(() => {
    getMicrophonePermission(setPermission, setStream);
  }, []);

  const handleSubmit = () => {
    
    console.log(first, last, age, genre);
    //const promises = addData({ first, last, age, genre });
    /* promises.then((data) => {
      console.log(data);
    }); */

  };

  return (
    <UserProvider>
      <main className="landing">
        <header>
          <h1>Tecnologico Nacional de México Campus Culiacán</h1>
          <h2>Bienvenido a Fraction Learning</h2>
        </header>
        <section>
          <article>
            <h2>Información del estudiante</h2>
            <div className="section-content">
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
                    />
                  </div>
                  <div>
                    <label htmlFor="genre" > Género: </label>
                    <select id="genre" onChange={e => setGenre(e.target.value)} required>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>

                  </div>
                </div>
                <button type="button" onClick={handleSubmit} >Confirmar datos</button>
              </form>
            </div>
          </article>
          <article className="instructions">
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
            <div className="section-content">
              <ul className="questions">
                <li>
                  <span>¿Qué es lo que te motiva?</span>
                  <AudioRecorder
                    stream={stream}
                    permission={permission}
                    audioName={"question-1"}
                    areSended={areSended}
                  />
                </li>

                <li>
                  <span>¿Cuál es tu materia favorita? ¿Por qué?</span>
                  <AudioRecorder
                    stream={stream}
                    permission={permission}
                    audioName={"question-2"}
                    areSended={areSended}
                  />
                </li>
                <li>
                  <span>¿Cuál es tu deporte favorito? ¿Por qué?</span>
                  <AudioRecorder
                    stream={stream}
                    permission={permission}
                    audioName={"question-3"}
                    areSended={areSended}
                  />
                </li>
              </ul>
            </div>
          </article>
          <button
            className="submit"
            type="submit"
            onClick={handleSubmit}
            disabled={(!(first && last && age))}
          >
            Continuar
          </button>
          <button onClick={() => {
            console.log(areSended)
            console.log(Object.keys(areSended).every((key) => areSended[key] === true))
            }}>
            Print

          </button>
        </section>
      </main>
    </UserProvider>
  );
};

export default Landing;
