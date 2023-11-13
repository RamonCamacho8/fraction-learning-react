import Dropdown from 'react-bootstrap/Dropdown';
import { getLanguageList, setCurrentLanguage, getLanguage,  getHomeObject, getCurrentLanguage } from '../services/getText';
import './styles/LanguageSelector.css';




function LanguageSelector({ language, setLanguageState, setLanguageObject}) {

  const currentLanguage = getCurrentLanguage();

  const handleChangeLanguage = (event) => {
    setCurrentLanguage(event.target.text);
    setLanguageState(getLanguage());
    setLanguageObject(getHomeObject());    
  }
  

  const languageItems = getLanguageList().map((lang, index) => {
    return (
      
      <Dropdown.Item key={index} onClick={handleChangeLanguage}>{lang}</Dropdown.Item>
    );
  });

  

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {currentLanguage}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languageItems}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;