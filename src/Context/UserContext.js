import {createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
    
    const [userName, setUserName] = useState('');
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [birth, setBirth] = useState('');
    const [age, setAge] = useState(0);
    const [genre, setGenre] = useState('');
    const [id, setId] = useState('');


    const [userData, setUserData] = useState({
        userId : '',
        firstName : '',
        lastName : '',
        birthDate : '',
        genre : '',
        personality: {presentsOpenness : true,
                        presentsNeuroticism : false},
        exercisesData: {
            easy : {},
            medium : {},
            hard : {}
        },
        audiosData: {
            
        }
    });

    return (
        <UserContext.Provider value={{userName, setUserName,
        first,setFirst,
        last,setLast,
        age,setAge,
        genre, setGenre,
        id, setId,
        birth, setBirth,
        userData, setUserData }}>
            
            {props.children}
        </UserContext.Provider>
    );
}


export const useUser = () => useContext(UserContext);