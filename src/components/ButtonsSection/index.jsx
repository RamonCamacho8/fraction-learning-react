import './style.css';
import { useLanguage } from '../../Context/LanguageContext';

export default function ButtonsSection({ handleCheck }){

    const { languageData } = useLanguage();
    const traductionText = languageData['board'];



    
    const CheckButton = () => 
    {
        return(
            <div className="checkButton">
                <button className="checkText" onClick={handleCheck} >{traductionText.buttons.check}</button>
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





