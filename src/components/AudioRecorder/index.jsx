import { useState, useRef } from "react";

import { getMicrophonePermission, startRecording, stopRecording } from "../../utils/recordAudio";
import { upload_audio } from "../../services/Audio";
import { getPersonality } from "../../services/Personality";
import { usePersonality } from "../../Context/PersonalityContext";

const AudioRecorder = () => {

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const mimeType = "audio/mp3";


    const {setOpeness, setNeuroticism} = usePersonality();


    const handlePermission = () => {
        getMicrophonePermission(setPermission,setStream);
    }
    const handleStart = () => {
        startRecording(setRecordingStatus, setAudioChunks, stream, mimeType,mediaRecorder);
    }
    const handleStop = () => {
        stopRecording(setRecordingStatus,setAudioChunks,setAudio, mediaRecorder, audioChunks, mimeType);
    }
    const handleSend = async () => {

        await upload_audio(audio);
        const personality = await getPersonality()
        setOpeness(personality.openness);
        setNeuroticism(personality.neuroticism);

    }


    return (
        <div className="AudioRecorder">
            {permission ? <p>Permission Granted</p> : <button onClick={handlePermission} >Get Permission</button>}
            {permission ? 
            (recordingStatus === "inactive" ? 
            (audio ? <button onClick={handleStart} >Record again</button> : <button onClick={handleStart} >Start recording</button> )
             : <button onClick={handleStop} >Stop Recording</button>) : null}
            {audio ? (<button onClick={handleSend} >Send</button>)  : null}
            
        </div>
    );
}


export default AudioRecorder;