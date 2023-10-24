import './styles/App.css';
import StatsSection from './BoardComponents/StatsSection';
import HeaderSection from './BoardComponents/HeaderSection';
import HelpSection from './BoardComponents/HelpSection';
import ProblemSection from './BoardComponents/ProblemSection';
import ButtonsSection from './BoardComponents/ButtonsSection';

var pApertura = 'Si';

export default function Board(){

    return(

        <div className="board">
            <HeaderSection  />
            <ProblemSection pApertura={pApertura} />
            <ButtonsSection />
            <HelpSection pApertura={pApertura}/>
            <StatsSection />
        </div>
    );

}