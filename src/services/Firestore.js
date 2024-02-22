import {collection, addDoc, getDocs, setDoc, doc} from "firebase/firestore";
import { firestore } from "../firebase";
import { enviroment } from "../Persistence/config"; 
//It can vary depending on the name of the folder in the firebase

let firebaseFolder = enviroment;

const testAddDoc = async (first = 'Ada', last='Lovelace', born= 1815) => {
  
    const data = {
      first: first,
      last: last,
      born: born,
      date: new Date()
    };

    return await addDoc(collection(firestore, "users"), data);

}

const addDocument = async (data) => {

    return await addDoc(collection(firestore, firebaseFolder), data);

}

const uptadeDocument = async (id, data) => {

  return await setDoc(doc(firestore, firebaseFolder, id), data);

}




const testGetDocs = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
  });
}

export { testAddDoc, testGetDocs, addDocument, uptadeDocument };