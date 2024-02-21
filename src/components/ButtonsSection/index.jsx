import './style.css';
import { useLanguage } from '../../Context/LanguageContext';
import { useExercices } from '../../Context/ExercicesContext';
import { isCorrectAnswer } from '../../Controllers/ExercicesController';
import { useNavigate } from 'react-router-dom';
import { useStats } from '../../Context/StatsContext';
import { useUser } from '../../Context/UserContext';
import { updateData } from '../../Controllers/dataFetch';
import { useEffect } from 'react';
export default function ButtonsSection(){

    const { languageData } = useLanguage();
    const traductionText = languageData['board'];
    const {trys,setTrys, time, setTime} = useStats();
    const {userData, setUserData} = useUser();

    const {selectedAnswer, currentExerciceIndex, difficulty, currentExercice,hasNextExercice, nextExercice, hastNextDifficulty, nextDifficulty} = useExercices();

    const navigate = useNavigate();
    
    useEffect(
        () => 
        {
            updateData(userData, userData.userId || 'bcoS2UEoDk5sZfbY0oWx');
            
        }, [userData]);

    const CheckButton = () => 
    {
        return(
                <button className="check-button" onClick={() =>{
                    if(isCorrectAnswer(selectedAnswer, currentExercice )){
                        
                        const newData = {
                            ...userData,
                            exercisesData : {
                                ...userData.exercisesData ?? {},
                                [difficulty] : {
                                    ...userData.exercisesData[difficulty] ?? {},
                                    [currentExerciceIndex] : {
                                        ...userData.exercisesData[difficulty][currentExerciceIndex],
                                        trys: trys,
                                        time: time
                                    }
                                }
                            }
                        }

                        setUserData(newData)                        
                        
                        if(hasNextExercice()){
                            nextExercice();
                        }else if(hastNextDifficulty()){
                            nextDifficulty();
                        }else{
                            
                            navigate('/survey');
                        }

                        setTrys(0);
                        setTime(0);
                    }
                    else {
                        setTrys(trys+1);
                    }

                }}>{traductionText.buttons.check}</button>
        );

    }

    


    return(
        <section className="check">

            <CheckButton />
            
        </section>
    );
}





