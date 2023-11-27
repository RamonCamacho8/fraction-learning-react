import { useState, useRef } from "react";

import { getMicrophonePermission, startRecording, stopRecording } from "../../utils/recordAudio";
import { upload_audio } from "../../services/Audio";
import { getPersonality, getPersonality_v2 } from "../../services/Personality";
import { usePersonality } from "../../Context/PersonalityContext";
import { useLanguage } from "../../Context/LanguageContext";

const AudioRecorder = ({audioName, stream, permission}) => {
    

    //const [permission, setPermission] = useState(false);
    //const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const mimeType = "audio/mp3";
    const {languageData} = useLanguage();

    const audioTraduction = languageData['audio'];


    const handleStart = () => {
        startRecording(setRecordingStatus, setAudioChunks, stream, mimeType,mediaRecorder);
        
    }
    const handleStop = async () => {
        
        stopRecording(setRecordingStatus,setAudioChunks,setAudio, mediaRecorder, audioChunks, mimeType);
        await upload_audio(audio, audioName);

    }

    return (
        <div className="AudioRecorder">

            {permission ? 
            (recordingStatus === "inactive" ? 
            (audio ? <button onClick={handleStart} >{audioTraduction.recordAgain}</button> : <button onClick={handleStart} >{audioTraduction.record}</button> )
             : <button onClick={handleStop} >{audioTraduction.stop}</button>) : null}

            
        </div>
    );
}


export default AudioRecorder;