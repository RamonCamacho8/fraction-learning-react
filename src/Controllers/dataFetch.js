import { addDocument, uptadeDocument } from "../services/Firestore"
    
const addData = (data) => {

    //From data capitalize the first letter of the first and last name and if the firstName and lastName have more than one word, capitalize the first letter of each word.
    data.firstName = data.firstName.toLowerCase();
    data.lastName = data.lastName.toLowerCase();
    data.firstName = data.firstName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    data.lastName = data.lastName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    //Convert the birthDate to a Date object
    data.birthDate = new Date(data.birthDate);
    //Add date to the data object
    data.registeredDate = new Date();

    return addDocument(data);
}

const updateData = (data, id) => {

    if(typeof data.age !== 'number')
        data.age = parseInt(data.age);
    //From data capitalize the first letter of the first and last name and if the firstName and lastName have more than one word, capitalize the first letter of each word.
    data.first = data.first.toLowerCase();
    data.last = data.last.toLowerCase();
    data.last.toLowerCase();
    data.first = data.first.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    data.last = data.last.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return uptadeDocument(id, data);
}


export { addData, updateData };