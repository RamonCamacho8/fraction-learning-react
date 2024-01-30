import React from "react";
import "./style.css";

import { useUser, UserProvider } from "../../Context/UserContext";
import { addDocument } from "../../services/Firestore";
import { addData } from "../../Controllers/dataFetch";
import { useState, useEffect } from "react";
import { getMicrophonePermission } from "../../utils/recordAudio";
import AudioRecorder from "../../components/AudioRecorder";
const Landing = () => {
  const { first, setFirst, last, setLast, age, setAge } = useUser();
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    getMicrophonePermission(setPermission, setStream);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addData({ first, last, age });
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
                      min={10}
                      max={18}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </article>
          <article>
            <h2>Instrucciones</h2>
            <div className="section-content">
              <p>
                Contesta a las preguntas de la sección "Preguntas" con la mayor
                sinceridad posible.
              </p>
              <p>Para ello:</p>
              <ol className="instructions">
                <li>Lee la pregunta.</li>
                <li>Cuando tengas lista tu respuesta, presiona "Grabar".</li>
                <li>Responde en voz alta la pregunta.</li>
              </ol>
              <p>Cuando termines, presiona "Continuar".</p>
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
                    audioName={"question0"}
                  />
                </li>

                <li>
                  <span>¿Cuál es tu materia favorita? ¿Por qué?</span>
                  <AudioRecorder
                    stream={stream}
                    permission={permission}
                    audioName={"question1"}
                  />
                </li>
                <li>
                  <span>¿Cuál es tu deporte favorito? ¿Por qué?</span>
                  <AudioRecorder
                    stream={stream}
                    permission={permission}
                    audioName={"question2"}
                  />
                </li>
              </ul>
            </div>
          </article>
          <button
            className="submit"
            type="submit"
            onClick={handleSubmit}
            disabled={!(first && last && age)}
          >
            Continuar
          </button>
        </section>
      </main>
    </UserProvider>
  );
};

export default Landing;
