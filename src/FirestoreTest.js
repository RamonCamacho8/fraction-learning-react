import {collection, addDoc, getDocs} from "firebase/firestore";
import { firestore } from "./firebase";


const testAddDoc = async () => {

    const data = {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
      date: new Date()
    };
    console.log("testAddDoc try");

    return await addDoc(collection(firestore, "users"), data);

}

const testGetDocs = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
  });
}

export { testAddDoc, testGetDocs };