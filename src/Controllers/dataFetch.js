import { addDocument } from "../services/Firestore"
    
const addData =  (data) => {

    if(typeof data.age !== 'number')
        data.age = parseInt(data.age);


    addDocument(data.first, data.last, data.age);
}

export { addData };