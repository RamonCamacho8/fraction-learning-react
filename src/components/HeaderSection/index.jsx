import { useLanguage } from "../../Context/LanguageContext.js";
import "./style.css";

const HeaderSection = () => {
    
  const { languageData } = useLanguage();
  const headerTraduction = languageData["board"].headerPanel;

  const Title = () => {
    return (
      <div className="title">
        <h1>{headerTraduction.title}</h1>
        <h2>{headerTraduction.subject}</h2>
      </div>
    );
  };

  const ActualDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = headerTraduction.months;

    let fullDate = `${day} / ${months[month]} / ${year}`;

    return (
      <div className="dateInformation">
        <h5>{headerTraduction.date}</h5>
        <h6>{fullDate}</h6>
      </div>
    );
  };

  const Student = () => {
    return (
      <div className="studentInformation">
        <h5>{headerTraduction.studentHolder}</h5>
        <h6>Ramon Camacho</h6>
      </div>
    );
  };

  return (
    <div className="headerSection">
      
      <div className="info">
        <Student />
        <ActualDate />
      </div>
      <Title />
    </div>
  );
};

export default HeaderSection;
