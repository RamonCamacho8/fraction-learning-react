function ErrosPanel({numErrors}){

    numErrors = numErrors || 0;

    return(
        <div className="errorsPanel">
            <div className="errors">Intentos:</div>
            <div className="errorsField">{numErrors}</div>
        </div>
    );
}

function HelpsPanel({numHelps}){
    numHelps = numHelps || 0;
    return(
        <div className="helpsPanel">
            <div className="helps">Ayudas:</div>
            <div className="helpsField">{numHelps}</div>
        </div>
    );
}

function TimePanel(){
    return(
        <div className="timePanel">
            <div className="time">Tiempo:</div>
            <div className="timeField">00:00</div>
        </div>
    );
}

function LevelPanel(){
    return(
        <div className="levelPanel">
            <div className="level">Nivel actual:</div>
            <div className="levelField">1</div>
        </div>
    );
}

export default function StatsSection(){
    return(
        <div className="statsSection">
            <TimePanel />
            <ErrosPanel />
            <HelpsPanel />
            <LevelPanel />
        </div>
    );
}