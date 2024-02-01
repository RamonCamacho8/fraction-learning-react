import { useState, useRef } from "react";
import { startRecording } from "../../utils/recordAudio";
import { upload_audio } from "../../services/Audio";
import { uploadAudio } from "../../services/CloudStorage";

const AudioRecorder = ({ audioName, stream, permission, areSended, disabled }) => {
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mimeType = "audio/mp3";


  const handleStart = () => {
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
      setAudio(audioUrl);
      setAudioChunks([]);
      await uploadAudio(audioBlob, audioName).then((url) => {
        areSended[audioName] = true;
      });

    };

    await mediaRecorder.current.stop();
  };

  const handleRestart = () => {
    setAudio(null);
  };

  return (
    <>
      {
        recordingStatus === "inactive" ? (
          audio ? (
            <button className="audio-button" onClick={handleRestart} disabled={!(permission && !disabled)}>
              Reintentar
            </button>
          ) : (
            <button className="audio-button" onClick={handleStart} disabled={!(permission && !disabled)}>
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
