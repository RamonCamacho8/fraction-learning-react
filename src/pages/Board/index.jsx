import './style.css';
import StatsSection from '../../components/BoardComponents/StatsSection';
import HeaderSection from '../../components/BoardComponents/HeaderSection';
import HelpSection from '../../components/BoardComponents/HelpSection';
import ProblemSection from '../../components/BoardComponents/ProblemSection';
import ButtonsSection from '../../components/BoardComponents/ButtonsSection';

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