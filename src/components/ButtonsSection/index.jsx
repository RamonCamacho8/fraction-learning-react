import './style.css';
import { useNavigate } from 'react-router-dom';

export default function ButtonsSection(props){

    const {onCheck, onNext, isCorrect} = props;
    

    /* const handleCheckIsCorrect = () => {
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

            setUserData(newData);                      
            
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
    } */

    return(
        <section className="check">
            <button className="check-button" onClick={onCheck} disabled={isCorrect}>Revisar</button>
            <button className="next-button" onClick={onNext} disabled={!isCorrect} >Siguiente</button>
        </section>
    );
}





