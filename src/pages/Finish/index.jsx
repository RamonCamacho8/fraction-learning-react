import React from "react";
import "./style.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import	{ useUser } from "../../Context/UserContext";

function Finish() {

    const {userData, setUserData} = useUser();
    const navigate = useNavigate();


    /* useEffect(() => {
        if (!userData.userId) {
          navigate("/");
        }
      }, [userData]); */

    const handleClick = () => {

        setUserData({
            userId : '',
            firstName : '',
            lastName : '',
            birthDate : '',
            genre : '',
            personality: {presentsOpenness : true,
                            presentsNeuroticism : false},
            exercisesData: {},
            audiosData: {}
        });

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
                            Has completado la actividad con éxito, <span> {userData.firstName || 'Nombre'} {userData.lastName || 'Apellido'} </span>. 
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