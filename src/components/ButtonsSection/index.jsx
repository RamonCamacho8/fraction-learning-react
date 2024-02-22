import './style.css';

export default function ButtonsSection(props){

    const {onCheck, onNext, isCorrect, checkRef, nextRef} = props;

    return(
        <section className="check">
            <button ref={checkRef} id='check-button' className="check-button" onClick={onCheck} disabled={isCorrect}  >Revisar</button>
            <button ref={nextRef} id='next-button' className="next-button" onClick={onNext} disabled={!isCorrect} >Siguiente</button>
        </section>
    );
}





