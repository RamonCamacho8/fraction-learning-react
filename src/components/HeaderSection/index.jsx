import { useLanguage } from "../../Context/LanguageContext.js";

const HeaderSection = () => {
    
  const { languageData } = useLanguage();
  const headerTraduction = languageData["board"].headerPanel;

  const Title = () => {
    return (
      <div className="title">
        <div className="tema">{headerTraduction.title}</div>
        <div className="titleField">{headerTraduction.subject}</div>
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
      <div>
        <div className="date">{headerTraduction.date}</div>
        <div className="dateField">{fullDate}</div>
      </div>
    );
  };

  const Student = () => {
    return (
      <div className="student">
        <div className="studentName">{headerTraduction.studentHolder}</div>
        <div className="name">name</div>
      </div>
    );
  };

  return (
    <div className="headerSection">
      <Title />
      <Student />
      <ActualDate />
    </div>
  );
};

export default HeaderSection;
