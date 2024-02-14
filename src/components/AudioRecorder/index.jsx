import { useState, useRef, useEffect } from "react";
import { startRecording } from "../../utils/recordAudio";
import { useUser } from "../../Context/UserContext";
const AudioRecorder = ({ audioName, stream, permission, disabled, userAudios, setUserAudios }) => {
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const mimeType = "audio/mp3";
  const [initialTime, setInitialTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [time, setTime] = useState(0);
  const { userData, setUserData } = useUser();
  const handleStart = () => {
    setRecordingStatus("recording");
    startRecording(
      setRecordingStatus,
      setAudioChunks,
      stream,
      mimeType,
      mediaRecorder
    );
    setInitialTime(new Date().getTime());
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
    setFinalTime(new Date().getTime());
  };

  useEffect(() => {
    setTime(finalTime - initialTime);

  }, [finalTime])


  useEffect(() => {
    
    //Get seconds and first two digits of milliseconds
    let newTime = time/1000;
    newTime = newTime.toFixed(2);
    setUserData(
      {
        ...userData,
        audiosData: {
          ...userData.audiosData,
          [audioName]: newTime
        }
      }
  )
  }, [time]);

  useEffect(() => {
  }, [userData.audiosData]);
     

  const handleRestart = () => {

    setRecordingStatus("inactive");

    setUserAudios({
      ...userAudios,
      [audioName]: null
    });
    
    setInitialTime(0);
    setFinalTime(0);
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
