import langObj from '../assets/lang/lang.json';

let _lang = "es";
let currentLanguage = langObj[_lang].language;



export function getHomeObject(lan = _lang) {
  return langObj[lan].home;
}

export function getBoardObject(lan = _lang) {
  return langObj[lan].board;
}

export function setLanguage(lang) {
  _lang = lang;
}

export function setCurrentLanguage(languageValue) {
  currentLanguage = languageValue;

  Object.keys(langObj).map((langKey) => {
    if (langObj[langKey].language === languageValue) {
      setLanguage(langKey);
    }
  });
}

export function getCurrentLanguage() {
  return currentLanguage;
}


export function getLanguage() {
  return _lang;
}

export function getLanguageList() {
  /**
   * Returns an array of languages as strings.
   */
  return Object.keys(langObj).map((langKey) => {
    return langObj[langKey].language;
  });


}