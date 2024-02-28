import {createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
    
    const [userData, setUserData] = useState({
        userId : '',
        personality: {presentsOpenness : true, presentsNeuroticism : false},
        userInfo: {},
        exercisesData: {},
        audiosData: {},
        registeredDate: ''
    });


    const reset = () => setUserData({
        userId : '',
        personality: {presentsOpenness : true, presentsNeuroticism : false},
        userInfo: {},
        exercisesData: {},
        audiosData: {},
        registeredDate: ''
    });

    return (
        <UserContext.Provider value={{userData, setUserData, reset }}>
            {props.children}
        </UserContext.Provider>
    );
}


export const useUser = () => useContext(UserContext);