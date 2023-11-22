import Dropdown from 'react-bootstrap/Dropdown';
import {getLanguageData, getLanguageList, setCurrentLanguage, getLanguage,  getHomeObject, getCurrentLanguage } from '../../services/Language.js';
import { useLanguage } from '../../Context/LanguageContext.js';
import './style.css';




function LanguageSelector() {

  const {language,languageData, setLanguage, setLanguageData} = useLanguage();

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.text);
    console.log(language)
    setLanguageData(getLanguageData(language));
  }
  

  const availableLanguages = getLanguageList().map((lang, index) => {
    return (
      
      <Dropdown.Item key={index} onClick={handleChangeLanguage}>{lang}</Dropdown.Item>
    
      );
  });

  

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {language}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {availableLanguages}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;