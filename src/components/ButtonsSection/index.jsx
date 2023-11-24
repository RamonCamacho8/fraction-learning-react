import './style.css';
import { useLanguage } from '../../Context/LanguageContext';
import { useExercices } from '../../Context/ExercicesContext';
import { isCorrectAnswer } from '../../Controllers/ExercicesController';
import { useNavigate } from 'react-router-dom';

export default function ButtonsSection(){

    const { languageData } = useLanguage();
    const traductionText = languageData['board'];
    
    const {selectedAnswer, currentExercice,hasNextExercice, nextExercice, hastNextDifficulty, nextDifficulty} = useExercices();

    const navigate = useNavigate();
    

    const CheckButton = () => 
    {
        return(
            <div className="checkButton">
                <button className="checkText" onClick={() =>{
                    if(isCorrectAnswer(selectedAnswer, currentExercice )){
                        if(hasNextExercice()){
                            nextExercice();
                        }else if(hastNextDifficulty()){
                            nextDifficulty();
                        }else{
                            navigate('/');
                        }
                    }
                    else {
                        alert('Wrong answer');

                    }

                }}>{traductionText.buttons.check}</button>
            </div>
        );

    }

    
    const NextButton = () => {

        return(
            <div className="nextButton">
                <button className="nextText">{traductionText.buttons.next}</button>
            </div>
        );

    }


    return(
        <div className="buttonsSection">

            <CheckButton />
            <NextButton  />
            
        </div>
    );
}





