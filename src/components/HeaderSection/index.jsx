import { useLanguage } from "../../Context/LanguageContext.js";
import "./style.css";
import { useUser } from "../../Context/UserContext.js";
const HeaderSection = () => {
    
  const { userData } = useUser();
  
  const Title = () => {
    return (
      <div className="title">
        <h2>Suma de Fracciones</h2>
      </div>
    );
  };

  const ActualDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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
        <h6>{userData.firstName}</h6>
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
