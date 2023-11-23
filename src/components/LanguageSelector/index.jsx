import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getLanguageData, getLanguageList } from '../../services/Language.js';
import { useLanguage } from '../../Context/LanguageContext.js';
import './style.css';




function LanguageSelector() {

  const {language, languageData, setLanguage, setLanguageData} = useLanguage();

  const handleChangeLanguage = (event) => {

    setLanguage(event.target.innerText);
    setLanguageData(getLanguageData(language));
    console.log(language);

  }
  

  const availableLanguages = getLanguageList().map((lang, index) => {
    return (
      
      <Dropdown.Item as="button" key={lang} onClick={handleChangeLanguage} >{lang}</Dropdown.Item>
    
      );
  });

  

  return (

  <DropdownButton id='dropdown-language-selector' title={`${language}`} >
    {availableLanguages}
  </DropdownButton>
  );
}

export default LanguageSelector;