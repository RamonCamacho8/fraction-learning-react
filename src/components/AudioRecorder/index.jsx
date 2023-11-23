import { useState, useRef } from "react";

import { getMicrophonePermission, startRecording, stopRecording } from "../../utils/recordAudio";
import { upload_audio } from "../../services/Audio";
import { getPersonality } from "../../services/Personality";
import { usePersonality } from "../../Context/PersonalityContext";
import { useLanguage } from "../../Context/LanguageContext";

const AudioRecorder = ({setInstruction}) => {
    

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const mimeType = "audio/mp3";
    const {languageData} = useLanguage();

    const audioTraduction = languageData['audio'];

    const {setOpeness, setNeuroticism} = usePersonality();


    const handlePermission = () => {
        getMicrophonePermission(setPermission,setStream);
        setInstruction(1);
    }
    const handleStart = () => {
        startRecording(setRecordingStatus, setAudioChunks, stream, mimeType,mediaRecorder);
        setInstruction(2);
    }
    const handleStop = () => {
        stopRecording(setRecordingStatus,setAudioChunks,setAudio, mediaRecorder, audioChunks, mimeType);
        setInstruction(3);
    }
    const handleSend = async () => {

        await upload_audio(audio);
        const personality = await getPersonality()
        if(personality){
            setInstruction(4);
            setOpeness(personality.openness);
            setNeuroticism(personality.neuroticism);
        }
        

    }


    return (
        <div className="AudioRecorder">

            {permission ? null : <button onClick={handlePermission} >
                {audioTraduction.permissions}</button>}
            {permission ? 
            (recordingStatus === "inactive" ? 
            (audio ? <button onClick={handleStart} >{audioTraduction.recordAgain}</button> : <button onClick={handleStart} >{audioTraduction.record}</button> )
             : <button onClick={handleStop} >{audioTraduction.stop}</button>) : null}
            {audio ? (<button onClick={handleSend} >{audioTraduction.send}</button>)  : null}
            
        </div>
    );
}


export default AudioRecorder;