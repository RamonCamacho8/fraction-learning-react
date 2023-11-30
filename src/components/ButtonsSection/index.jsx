import './style.css';
import { useLanguage } from '../../Context/LanguageContext';
import { useExercices } from '../../Context/ExercicesContext';
import { isCorrectAnswer } from '../../Controllers/ExercicesController';
import { useNavigate } from 'react-router-dom';
import { useStats } from '../../Context/StatsContext';

export default function ButtonsSection(){

    const { languageData } = useLanguage();
    const traductionText = languageData['board'];
    const {trys,setTrys, setTime} = useStats();
    
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
                        setTrys(0);
                        setTime(0);
                    }
                    else {
                        setTrys(trys+1);
                    }

                }}>{traductionText.buttons.check}</button>
            </div>
        );

    }

    


    return(
        <div className="buttonsSection">

            <CheckButton />
            
        </div>
    );
}





