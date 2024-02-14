import { audioStorageRef } from "../firebase";
import { uploadBytes, ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";



const uploadAudios = async (audios, userId) => {
    //Files is an object with the file name as the key and the file as the value
    let audiosURLs = [];
    for(const audio in audios){
        audiosURLs.push(
            await uploadAudio(audios[audio], audio, userId)
        );
    }
    
    return audiosURLs;
    
}


const uploadAudio = async (file, fileName, userId) => {
    
    let audioRef = ref(audioStorageRef, userId);
    audioRef = ref(audioRef, fileName + '.mp3');
    
    await uploadBytes(audioRef, file).then(() => {
        //console.log(`File ${fileName} uploaded to ${userId} successfully!`);
    }
    )
    
    let audioURL = await getDownloadURL(audioRef);
    
    return audioURL;
    
}


export { uploadAudio, uploadAudios };