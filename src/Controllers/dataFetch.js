import { addDocument, uptadeDocument } from "../services/Firestore"
import { dateNormalizer } from "../utils/formValidations";  
const addData = (data) => {

    //Convert the birthDate to a Date object
    data.userInfo.birthDate = new Date(dateNormalizer(data.userInfo.birthDate));
    //Add date to the data object
    data.registeredDate = new Date();

    return addDocument(data);
}

const updateData = (data, id) => {

    return uptadeDocument(id, data);
    
}

const normalizeData = (data) => {
    data.firstName = data.firstName.toLowerCase();
    data.lastName = data.lastName.toLowerCase();
    data.firstName = data.firstName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    data.lastName = data.lastName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return data;
}

const normalizeString= (string) => {
    string = string.toLowerCase();
    string = string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return string;
}


export { addData, updateData, normalizeString};