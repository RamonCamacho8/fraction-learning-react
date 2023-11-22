import {createContext, useContext, useState } from 'react';

const PersonalityContext = createContext();



export const PersonalityProvider = (props) => {
    
    const [openess, setOpeness] = useState(true);
    const [neuroticism, setNeuroticism] = useState(true);

    return (
        <PersonalityContext.Provider value={{openess, setOpeness, neuroticism, setNeuroticism}}>
            {props.children}
        </PersonalityContext.Provider>
    );
}

export const usePersonality = () => {
    return useContext(PersonalityContext);
}