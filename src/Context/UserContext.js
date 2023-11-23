import {createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
    
    const [userName, setUserName] = useState('');

    return (
        <UserContext.Provider value={{userName, setUserName}}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);