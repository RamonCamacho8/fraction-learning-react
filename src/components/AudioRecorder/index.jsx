import { useState, useRef } from "react";
import { startRecording } from "../../utils/recordAudio";

const AudioRecorder = ({ audioName, stream, permission, disabled, userAudios, setUserAudios }) => {
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const mimeType = "audio/mp3";


  const handleStart = () => {
    setRecordingStatus("recording");
    startRecording(
      setRecordingStatus,
      setAudioChunks,
      stream,
      mimeType,
      mediaRecorder
    );
  };
  const handleStop = async () => {
    //stopRecording(setRecordingStatus,setAudioChunks,setAudio, mediaRecorder, audioChunks, mimeType);
    setRecordingStatus("inactive");

    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      const blobResponse = await fetch(audioUrl);
      const blob = await blobResponse.blob();

      setAudioChunks([]);
      setUserAudios({
        ...userAudios,
        [audioName]: blob
      });

    };

    await mediaRecorder.current.stop();
  };

  const handleRestart = () => {

    setRecordingStatus("inactive");

    setUserAudios({
      ...userAudios,
      [audioName]: null
    });

  };

  return (
    <>
      {
        recordingStatus === "inactive" ? (
          userAudios[audioName] ? (
            <button className="audio-button" onClick={handleRestart} disabled={!(permission && !disabled)}>
              Reintentar
            </button>
          ) : (
            <button className="audio-button" style={{position:'relative'}} onClick={handleStart} disabled={!(permission && !disabled)}>
              Grabar
            </button>
          )
        ) : (
          <button className="audio-button" onClick={handleStop} disabled={!(permission && !disabled)}>
            Detener
          </button>
        )
      }
          
    </>
  );
};

export default AudioRecorder;
