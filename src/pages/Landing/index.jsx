import React from 'react';
import './style.css';

import { useUser, UserProvider } from '../../Context/UserContext';
import { addDocument } from '../../FirestoreTest';

const Landing = () => {

    
    const { 
        first, setFirst,
        last, setLast,
        age, setAge
     } = useUser();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument(
            first,
            last,
            age
        );
    }

    return (
        <UserProvider>
            <main className='landing'>
                <header>
                    <h1>Tecnologico Nacional de México Campus Culiacán</h1>
                    <h2>Bienvenido a Fraction Learning.</h2>
                </header>
                <section>
                    <article>
                        <h2>Información del estudiante</h2>
                        <div className='section-content'>
                            <form>
                                <div className='inputs'>
                                    <div>
                                        <label htmlFor='first'> Nombre: </label>
                                        <input id="first" type="text" value={first} onChange={(e) => setFirst(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor='last'> Apellido: </label>
                                        <input id="last" type="text" value={last} onChange={(e) => setLast(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor='age' > Edad: </label>
                                        <input  id="age" type="number" min={10} max={18} value={age} onChange={(e) => setAge(e.target.value)} />
                                    </div>
                                </div>
                                <button type="submit" onClick={handleSubmit}>Ingresar</button>

                            </form>
                        </div>
                    </article>
                    <article>
                        <h2>Instrucciones</h2>
                        <div className='section-content'>
                            <p>
                                Contesta a las preguntas de la sección "Preguntas" con la mayor sinceridad posible.
                                <br></br>
                                <p>Para ello:</p>
                                <ol>
                                    <li>Lee la pregunta.</li>
                                    <li>Cuando tengas lista tu respuesta, presiona "Grabar".</li>
                                    <li>Responde en voz alta la pregunta.</li>
                                </ol>
                            </p>
                        </div>
                    </article>
                    <article>
                        <h2>Preguntas</h2>
                        <div className='section-content'>
                            <p>
                                <ul>
                                    <li>¿Qué es lo que te motiva?</li>
                                </ul>
                            </p>
                        </div>
                    </article>
                </section>
            </main>
        </UserProvider>
    );
};


export default Landing;