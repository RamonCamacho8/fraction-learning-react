import { imageStorageRef, audioStorageRef } from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";


const uploadImage = async (file) => {
    
    console.log(file.name);
    const imageRef = ref(imageStorageRef, 'image.png');
    console.log(imageRef);
    await uploadBytes(imageRef, file);
    /* const storageRef = imageStorageRef;
    await uploadBytes(storageRef, file);
    return 'a'; */
    
}

const uploadAudio = async (file, fileName) => {
    
    const audioRef = ref(audioStorageRef, `${fileName}.mp3`);
    console.log(audioRef);
    await uploadBytes(audioRef, file);
    return await getDownloadURL(audioRef);
    
}


export { uploadImage, uploadAudio };