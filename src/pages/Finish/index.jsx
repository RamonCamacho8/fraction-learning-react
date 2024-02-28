import React from "react";
import "./style.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import	{ useUser } from "../../Context/UserContext";
import { useExercices } from "../../Context/ExercicesContext";

function Finish() {

    const {userData, reset} = useUser();
    const navigate = useNavigate();
    const { reset: resetExercices } = useExercices();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

     useEffect(() => {
        if (!userData.userId) {
          navigate("/");
        }


      }, [userData]); 

    const handleClick = () => {

        reset();
        resetExercices();

        navigate("/");

    }

    

    return (
        <main className="finish">
            <header>
                <h1>FractionLearning!</h1>
            </header>
            <section>
                <article>
                    <div className="section-content" style={{textAlign:'center'}}>
                        <h2 style={{fontWeight:'bold'}} >¡Felicidades!</h2>
                        <p>
                            Has completado la actividad con éxito, <span> {userData.userInfo.firstName || 'Nombre'} {userData.userInfo.lastName || 'Apellido'} </span>. 
                        </p>
                        <p>
                            Gracias por tu participación.
                        </p>
                        <p>
                            Si deseas, puedes volver a realizar la actividad dando click en el botón <span>"Reintentar"</span>.
                            De lo contrario, puedes cerrar la ventana.
                        </p>
                        <button onClick={handleClick} >Reintentar</button>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default Finish;