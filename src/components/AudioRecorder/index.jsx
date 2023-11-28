import { useState, useRef } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import {  startRecording } from "../../utils/recordAudio";
import { upload_audio } from "../../services/Audio";
import { useLanguage } from "../../Context/LanguageContext";
import { IoReloadCircle } from "react-icons/io5";


const AudioRecorder = ({audioName, stream, permission}) => {
    
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
        
        //stopRecording(setRecordingStatus,setAudioChunks,setAudio, mediaRecorder, audioChunks, mimeType);
        setRecordingStatus("inactive");
               
        mediaRecorder.current.onstop = async () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log(1,audioUrl);
            setAudio(audioUrl);
            setAudioChunks([]);
            await upload_audio(audioUrl, audioName);
        };
        
        mediaRecorder.current.stop();

    }

    const handleRestart = () => {
        setAudio(null);
    }


    return (
        <div className="AudioRecorder">


            {permission ? 
            (recordingStatus === "inactive" ? 
            (audio ? <button className='audio-button' onClick={handleRestart} ><IoReloadCircle/></button>
             : 
             <button className='audio-button' onClick={handleStart} ><FaPlayCircle/></button> 
             ) : (
             <button className='audio-button' onClick={handleStop} ><FaCircleStop/></button>)) 
             : null}

            
        </div>
    );
}


export default AudioRecorder;