import { audioStorageRef } from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";



const uploadAudios = async (audios, userId) => {
    //Files is an object with the file name as the key and the file as the value
    for(const audio in audios){
        await uploadAudio(audios[audio], audio, userId);
    }

    return true;
    
}


const uploadAudio = async (file, fileName, userId) => {
    
    let audioRef = ref(audioStorageRef, userId);
    audioRef = ref(audioRef, fileName + '.mp3');

    await uploadBytes(audioRef, file).then(() => {
        console.log(`File ${fileName} uploaded to ${userId} successfully!`);
    }
    )
    
    /*return await getDownloadURL(audioRef); */
    
}


export { uploadAudio, uploadAudios };