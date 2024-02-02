import { audioStorageRef } from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";



const uploadAudios = async (audios, userId) => {
    //Files is an object with the file name as the key and the file as the value
    Object.keys(audios).forEach((fileName) => {
        if (audios[fileName] === null) {
            return;
        }
        uploadAudio(audios[fileName], fileName, userId);
    }
    );

    
}


const uploadAudio = async (file, fileName, userId) => {
    
    let audioRef = ref(audioStorageRef, userId);
    audioRef = ref(audioRef, fileName + '.mp3');

    await uploadBytes(audioRef, file);
    
    /*return await getDownloadURL(audioRef); */
    
}


export { uploadAudio, uploadAudios };