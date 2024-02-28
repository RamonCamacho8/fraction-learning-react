import { addDocument, uptadeDocument, getDocsQuantity } from "../services/Firestore"
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



const normalizeString = (string) => {
    string = string.toLowerCase();
    string = string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return string;
}


export { addData, updateData, normalizeString };