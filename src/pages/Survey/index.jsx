import React, { useEffect, useState, useRef }  from "react";
import "./style.css";
import Question from "./Question";
import CustomAccordion from "../../lib/ui/CustomAccordion";
import { useUser } from "../../Context/UserContext";
import { updateData } from "../../Controllers/dataFetch";
import { useNavigate } from "react-router-dom";

const tamQuestions = [
  "Usar las pantallas o menús de FractionLearning es fácil.",
  "No necesito esforzarme para entender y usar FractionLearning.",
  "Creo que lo que aprendo con FractionLearning es útil para mí.",
  "FractionLearning me ayuda a entender mejor las fracciones.",
  "Estoy dispuesto a utilizar FractionLearning de manera regular para mejorar mis habilidades en las fracciones.",
  "Recomendaría FractionLearning a mis amigos que quieran mejorar sus conocimientos de las fracciones.",
  "Disfruté usar FractionLearning para practicar fracciones.",
  "Me gustó como se ve y funciona FractionLearning.",
  "Aprender fracciones con FractionLearning es más interesante que en las clases normales.",
  "Pienso que sería buena idea utilizar FractionLearning en el salón de clases."
]

const emojis = [
  {
      emoji: "fa-face-frown",
      color: "#3b257e",
      text: "Totalmente en desacuerdo"
  },
  {
      emoji: "fa-face-meh",
      color: "#74C0FC",
      text: "En desacuerdo"
  },
  {
      emoji: "fa-face-smile",
      color: "#ffd438",
      text: "Neutral"
  },
  {
      emoji: "fa-face-smile-beam",
      color: "#00FF62",
      text: "De acuerdo"
  },
  {
      emoji: "fa-face-laugh-beam",
      color: "#00B344",
      text: "Totalmente de acuerdo"
  }
]

function Survey() {

  const [questionsObj, setQuestionsObj] = useState(null);
  const [comments, setComments] = useState('');
  const {userData, setUserData} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.userId) {
      navigate("/");
    }
  }, [userData]);

  useEffect(() => {

    let questionsData = tamQuestions.reduce((acc, question, index) => {
      acc[index+1] = {
        text : question,
        answer: null
      };
      return acc;
    }, {});

    setQuestionsObj(questionsData);
    //console.log('userData at beginning',userData)

  }, []);

  const handleAnswer = (text, questionIndex, answer) => {
    
    const data = {
      [questionIndex + 1]: {
        text : text,
        answer: answer
      }
    }

    setQuestionsObj(prev => ({...prev, ...data}));
    
  }

  const handleSubmit = () => {
    setUserData(prev => ({...prev, survey: questionsObj, comments: comments}));
    
  }

  useEffect(() => {
    
    if(userData.survey){
      updateData(userData, userData.userId).then(() => {
        navigate("/form");
      });
    }

  }, [userData]);

  return (
    <main className="survey">
      {/* This 'header element' can be a component */}
      <header>
          <h1>FractionLearning!</h1>
      </header>
      <section>
        <CustomAccordion title="Instrucciones">
        <p>Con base en tu experiencia con la herramienta FractionLearning,
                contesta las siguientes preguntas considerando: 
              </p>
              {
                emojis.map((emoji, index) => {
                  return (
                    <p key={index}>
                      <i className={`fa-solid ${emoji.emoji}`} style={{color: emoji.color}}></i> {emoji.text}
                    </p>
                  );
                })
              }
              
        </CustomAccordion>
        <CustomAccordion title="Preguntas">
            <div>
              <ol className="survey-questions">
                {
                  tamQuestions.map((question, index) => {
                    return <Question emojis={emojis} key={question} questionIndex={index} text={question} handleAnswer={handleAnswer}/>
                  })
                }
              </ol>
            </div>
            <form style={{display:'flex', flexDirection:'column', }}>
              <label>Opiniones y sugerencias:</label>
              <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Escribe aquí tus comentarios"></textarea>
            </form>
        </CustomAccordion>
        <article>
          <button disabled={
            Object.values(questionsObj || {}).some(question => question.answer === null)
          } onClick={handleSubmit}>Terminar Cuestionario</button>
        </article>
      </section>
    </main>
  );

}

export default Survey;