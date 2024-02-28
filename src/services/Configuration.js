import { doc, getDoc} from "firebase/firestore";
import { firestore } from "../firebase";

export const getConfigurationDoc = async () => {

    const docRef = doc(firestore, "options", "arguments");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return "No such document!";
    }
}

export const getEnvironment = async () => {
    const data = getConfigurationDoc();
    return data.then((data) => {
        console.log(data.save_folder);
        return data.save_folder;
    });
}

export const getEndpoint = async () => {
    const data = getConfigurationDoc();
    return data.then((data) => {
        console.log(data.person_endpoint);
        return data.person_endpoint;
    });
}
