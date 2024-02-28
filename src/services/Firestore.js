import { collection, addDoc, getDocs, setDoc, doc, getDoc} from "firebase/firestore";
import { firestore } from "../firebase";
import { enviroment } from "../Persistence/config"; 
import { getEnvironment } from "./Configuration";
//It can vary depending on the name of the folder in the firebase

let firebaseFolder = await getEnvironment();

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