import {createContext, useContext, useState } from 'react';

const PersonalityContext = createContext();



export const PersonalityProvider = (props) => {
    
    const [openness, setOpenness] = useState(false);
    const [neuroticism, setNeuroticism] = useState(true);

    return (
        <PersonalityContext.Provider value={{openness, setOpenness, neuroticism, setNeuroticism}}>
            {props.children}
        </PersonalityContext.Provider>
    );
}

export const usePersonality = () => {
    return useContext(PersonalityContext);
}