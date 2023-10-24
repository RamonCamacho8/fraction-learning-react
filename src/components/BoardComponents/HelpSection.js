import image from '../../assets/images/fracgif.gif';
import '../styles/HelpSection.css'

export default function HelpSection({pApertura}){
    pApertura = pApertura || 'No';
    return(
        <div className="helpsSection">
            <div className="helps"> Panel de ayuda: </div>
            <HelpComponent pApertura={pApertura}/>
        </div>
    );
}


function HelpComponent({pApertura}){
    switch (pApertura){
        case 'Si':
            return (VisualHelp());
        case 'No':
            return (VerbalHelp());
        default:
            return (VerbalHelp());
    }
}

function VisualHelp(){

    return(
        <div className="visualHelp">
            <img className="verbalHelp" src={image} alt="verbal-Help" border="0"/>
        </div>
    );

}

function VerbalHelp(){
    
        return(
            <div className="verbalHelp">
                <text className="verbalHelpText">Primero multiplica los denominadores. El resultado es tu denominador final.</text>
                <br/>
                <text className="verbalHelpText">Luego multiplica cada denominador por los otros numeradores </text>
                <br/>
                <text className="verbalHelpText">Suma los resultados de estas multiplicaciones y el resultado sería tu numerador final.</text>
            </div>
        );
}