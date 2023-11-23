import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getLanguageData, getLanguageList } from "../../services/Language.js";
import { useLanguage } from "../../Context/LanguageContext.js";
import "./style.css";

function LanguageSelector() {
  const { language, setLanguage, setLanguageData } =
    useLanguage();

  const availableLanguages = getLanguageList().map((lang) => {
    return (
      <Dropdown.Item
        as="button"
        key={lang}
        onClick={() => {
          setLanguage(lang);
          setLanguageData(getLanguageData(lang));
        }}
      >
        {lang}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton className="language-selector" id="dropdown-language-selector" title={language}>
      {availableLanguages}
    </DropdownButton>
  );
}

export default LanguageSelector;
