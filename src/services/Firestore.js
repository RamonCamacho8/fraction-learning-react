import { collection, addDoc, getDocs, setDoc, doc} from "firebase/firestore";
import { firestore } from "../firebase";
import { enviroment } from "../Persistence/config"; 
//It can vary depending on the name of the folder in the firebase

let firebaseFolder = enviroment;

const addDocument = async (data) => {

    return await addDoc(collection(firestore, firebaseFolder), data);

}

const uptadeDocument = async (id, data) => {

  return await setDoc(doc(firestore, firebaseFolder, id), data);

}

const getDocsQuantity = async () => {
  const querySnapshot = await getDocs(collection(firestore, firebaseFolder));
  return querySnapshot.size;
}



export { addDocument, uptadeDocument, getDocsQuantity };