import {collection, addDoc, getDocs} from "firebase/firestore";
import { firestore } from "../firebase";


const testAddDoc = async (first = 'Ada', last='Lovelace', born= 1815) => {

    const data = {
      first: first,
      last: last,
      born: born,
      date: new Date()
    };

    return await addDoc(collection(firestore, "users"), data);

}

const addDocument = async (firstName, lastName, age) => {

    if(typeof age !== 'number')
      age = parseInt(age);

    const data = {
      firstName,
      lastName,
      age,
      date : new Date()
    };

    return await addDoc(collection(firestore, "records"), data);

  }


const testGetDocs = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
  });
}

export { testAddDoc, testGetDocs, addDocument };