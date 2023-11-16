import './style.css';

export default function ButtonsSection({selectedAnswer:selectedAnswer, buttonsText:buttonsText, handleCheck:handleCheck }){

    



    return(
        <div className="buttonsSection">
            <NextButton text="Siguiente" />
            <CheckButton text="Revisar" onClick={handleCheck} />
        </div>
    );
}


function CheckButton({text, onClick}){
    return(
        <div className="checkButton">
            <button className="checkText" onClick={onClick} >{text}</button>
        </div>
    );
}

function NextButton({text}){
    return(
        <div className="nextButton">
            <button className="nextText">{text}</button>
        </div>
    );
}

