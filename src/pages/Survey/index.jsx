import React, { useEffect, useState }  from "react";
import "./style.css";
import Question from "./Question";
import { Accordion } from "react-bootstrap";
import CustomAccordion from "../../lib/ui/CustomAccordion";

const tamQuestions = [
"Pregunta 1",
"Pregunta 2",
"Pregunta 3",
"Pregunta 4",
"Pregunta 5",
"Pregunta 6",
"Pregunta 7",
"Pregunta 8",
"Pregunta 9",
"Pregunta 10",
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
  //Get the questions...

  useEffect(() => {

    setQuestionsObj({tamQuestions: {}});


  }, []);

  const handleAnswer = (text, answer) => {
    const data = {
      question : text,
      answer : answer
    }
  }

  return (
    <main className="survey">
      {/* This can be a component */}
      <header>
          <h1>FractionLearning!</h1>
      </header>
      <section>
      <CustomAccordion title="Instrucciones">
      <p>Con base en tu experiencia con la herramienta FractionLearning,
               contesta las siguientes preguntas considerando: 
            </p>
            {/* <p>
              <i className="fa-solid fa-face-frown" style={{color:'#3b257e'}}></i> Totalmente en desacuerdo.
            </p>
            <p>
              <i className="fa-solid fa-face-meh" style={{color:'#3b257e'}}></i> En desacuerdo.
            </p> */}
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
      </CustomAccordion>
        <article>
          
        </article>
      </section>
    </main>
  );

}

export default Survey;