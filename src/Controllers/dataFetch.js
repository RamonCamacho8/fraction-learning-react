import { addDocument } from "../services/Firestore"
    
const addData = (data) => {

    if(typeof data.age !== 'number')
        data.age = parseInt(data.age);
    //From data capitalize the first letter of the first and last name and if the firstName and lastName have more than one word, capitalize the first letter of each word.
    data.first = data.first.toLowerCase();
    data.last = data.last.toLowerCase();
    data.last.toLowerCase();
    data.first = data.first.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    data.last = data.last.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return addDocument(data.first, data.last, data.age);
}

export { addData };