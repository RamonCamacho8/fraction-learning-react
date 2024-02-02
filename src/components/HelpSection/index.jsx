import { useState } from 'react';
import { useLanguage } from '../../Context/LanguageContext';
import { usePersonality } from '../../Context/PersonalityContext';

import './style.css'

import verbal_step_1 from '../../assets/images/fractions/1.png';
import verbal_step_2 from '../../assets/images/fractions/2.png';
import verbal_step_3 from '../../assets/images/fractions/3.png';
import verbal_step_4 from '../../assets/images/fractions/4.png';
import verbal_step_5 from '../../assets/images/fractions/5.png';
import verbal_step_6 from '../../assets/images/fractions/6.png';

import visual_step_1 from '../../assets/images/fractions/8.png';
import visual_step_2 from '../../assets/images/fractions/9.png';
import visual_step_3 from '../../assets/images/fractions/10.png';
import visual_step_4 from '../../assets/images/fractions/11.png';

import global_verbal_Img from '../../assets/images/fractions/7.png';
import global_visual_Img from '../../assets/images/fractions/12.png';

const verbalHelp = [verbal_step_1,verbal_step_2,verbal_step_3,verbal_step_4,verbal_step_5,verbal_step_6,global_verbal_Img];
const visualHelp =[visual_step_1,visual_step_2,visual_step_3,visual_step_4,global_visual_Img];



export default function HelpSection(){

    const traductionText = useLanguage().languageData['board'].helpPanel;

    return(

        <div className="help-section">
            <div className="help-text"> {traductionText} </div>
            <HelpComponent />
        </div>

    );
}



function HelpComponent(){

    const hasOpenness = usePersonality().openness;
    const hasNeuroticism = usePersonality().neuroticism;
    const content = hasOpenness ? visualHelp : verbalHelp;



    switch (hasNeuroticism){
        case true:
            return (GlobalHelp({content: content}));
        case false:
            return (SequentialHelp({content: content}));
        default:
            return (GlobalHelp({content: content}));
    }
}



function GlobalHelp({content}){
    

    return (
        <div className="global-help">
            <figure className='figure'>
                <img  key='last image' className="figure-img img-fluid rounded" src={content[content.length -1]} alt="visualHelp global" border="0"/>
            </figure>
        </div>
    );

}



function SequentialHelp({content}){
    
    content = content.slice(0, content.length - 1);

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
        <div className="sequential-help">
            <div className="sequential-help-buttons">
                <button onClick={() => handleClick(-1)  } > {'<'} </button>
            </div>
            <div className="sequential-help-content">
                <img className="figure-img img-fluid rounded" src={actualContent} border="0"/>
            </div>
            <div className="sequential-help-buttons">
                <button  onClick={() => handleClick(1)}> {'>'} </button>
            </div>
        </div>
    );

}