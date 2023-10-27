import { useState } from 'react';

import gif from '../../assets/images/fracgif.gif';
import '../styles/HelpSection.css'

import img1 from '../../assets/images/fractions/1.png';
import img2 from '../../assets/images/fractions/2.png';
import img3 from '../../assets/images/fractions/3.png';
import img4 from '../../assets/images/fractions/4.png';
import img5 from '../../assets/images/fractions/5.png';
import img6 from '../../assets/images/fractions/6.png';

const visualHelp = [img1,img2,img3,img4,img5,img6];
const verbalHelpList =[
    "Primero multiplica los denominadores. El resultado es tu denominador final.",
    "Luego multiplica cada denominador por los otros numeradores ",
    "Suma los resultados de estas multiplicaciones y el resultado sería tu numerador final."
]



export default function HelpSection({pApertura}){
    pApertura = pApertura || 'No';
    pApertura = true;
    const pNeuroticismo = true;
    return(
        <div className="helpsSection">
            <div className="helpsText"> Panel de ayuda: </div>
            <HelpComponent pApertura={pApertura} pNeuroticismo={pNeuroticismo}/>
        </div>
    );
}



function HelpComponent({pApertura, pNeuroticismo}){

    const content = pApertura ? verbalHelpList : visualHelp;


    switch (pNeuroticismo){
        case true:
            return (GlobalHelp({content: content, type: pApertura ? 'verbal' : 'visual'}));
        case false:
            return (SequentialHelp({content: content, type: pApertura ? 'verbal' : 'visual'}));
        default:
            return (GlobalHelp({content: content, type: pApertura ? 'verbal' : 'visual'}));
    }
}



function GlobalHelp({content, type}){
    
    let components = [];
    if(type === 'verbal'){
        for(let i = 0; i < content.length; i++){
            components.push(<div key={"step:" + i} className="verbalHelp global">{content[i]}</div>);
        }
    } else {
        components.push(<img  key='last image' className="visualHelp global" src={content[content.length -1]} alt="visualHelp global" border="0"/>);
    }



    return (
        <div className="globalHelp">
            {components}
        </div>
    );

}



function SequentialHelp({content, type}){

    const [actualStep, setActualStep] = useState(0);
    const [actualContent, setActualContent] = useState(content[0]);

    const handleClick = (number) => {
        
        if (number === -1){
            if(actualStep === 0){
                return;
            }
        }

        if (number === 1){
            if(actualStep === content.length - 1){
                return;
            }
        }

        setActualStep(actualStep + number);
        setActualContent(content[actualStep + number]);

    }

    
    return (
        <div className="sequentialHelp">
            <div className="sequentialHelpButtons">
                <button  onClick={() => handleClick(-1)}> {'<'} </button>
            </div>
            <div className="sequentialHelpContent">
                {
                type === 'verbal' ? 
                (
                <div className="sequentialHelpText">{actualContent}</div>
                ) : (
                <img className="sequentialHelpImage" src={actualContent} alt="visualHelp global" border="0"/>
                )}
            </div>
            <div className="sequentialHelpButtons">
                <button  onClick={() => handleClick(1)}> {'>'} </button>
            </div>
        </div>
    );
   


}