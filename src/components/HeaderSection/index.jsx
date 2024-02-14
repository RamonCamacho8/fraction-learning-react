import { useLanguage } from "../../Context/LanguageContext.js";
import "./style.css";

const HeaderSection = () => {
    
  const { languageData } = useLanguage();
  const headerTraduction = languageData["board"].headerPanel;

  const Title = () => {
    return (
      <div className="title">
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
      <div className="date">
        <h6>{fullDate}</h6>
      </div>
    );
  };

  const Student = () => {
    return (
      <div className="student">
        <h6>User's Name</h6>
      </div>
    );
  };

  return (
    <header>
        <Student />
        <ActualDate />
        <Title />
    </header>
  );
};

export default HeaderSection;
