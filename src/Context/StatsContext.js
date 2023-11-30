import {createContext, useContext, useState } from 'react';


const StatsContext = createContext();

export const StatsProvider = (props) => {

    const [trys, setTrys] = useState(0);
    const [time, setTime] = useState(0);

    return (
        <StatsContext.Provider value={{ trys, setTrys, time, setTime }}>
            {props.children}
        </StatsContext.Provider>
    );
}

export const useStats = () => {
    return useContext(StatsContext);
}