import './styles/App.css';
import StatsSection from './BoardComponents/StatsSection';
import HeaderSection from './BoardComponents/HeaderSection';
import HelpSection from './BoardComponents/HelpSection';
import ProblemSection from './BoardComponents/ProblemSection';
import ButtonsSection from './BoardComponents/ButtonsSection';


export default function Board(){

    return(

        <div className="board">
            <HeaderSection />
            <ProblemSection />
            <ButtonsSection />
            <HelpSection />
            <StatsSection />
        </div>
    );

}