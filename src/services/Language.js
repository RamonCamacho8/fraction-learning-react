import langObj from '../assets/lang/lang.json';


let languageDictionary =  Object.keys(langObj)
.map((langKey) => {return {[langObj[langKey].language]:langKey}});

languageDictionary = Object.assign({}, ...languageDictionary);

export function getHomeObject(lan) {
  return langObj[lan].home;
}

export function getLanguageData(lan) {

  return langObj[languageDictionary[lan]];

}

export function getBoardObject(lan ) {
  return langObj[lan].board;
}

export function getLanguageList() {
  /**
   * Returns an array of languages as strings.
   */
  return Object.keys(langObj).map((langKey) => {
    return langObj[langKey].language;
  });

}