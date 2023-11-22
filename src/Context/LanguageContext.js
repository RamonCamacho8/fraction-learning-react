import {createContext, useContext, useState } from 'react';
import { getLanguageData } from '../services/Language';

const LanguageContext = createContext();

export const LanguageProvider = (props) => {

    const [language, setLanguage] = useState('English');
    const [languageData, setLanguageData] = useState(getLanguageData(language));

    return (
        <LanguageContext.Provider value={{language, setLanguage,languageData, setLanguageData }}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    return useContext(LanguageContext);
}
