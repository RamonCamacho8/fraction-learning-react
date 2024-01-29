import {createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
    
    const [userName, setUserName] = useState('');
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [age, setAge] = useState(0);

    return (
        <UserContext.Provider value={{userName, setUserName,
        first,setFirst,
        last,setLast,
        age,setAge}}>
            
            {props.children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);