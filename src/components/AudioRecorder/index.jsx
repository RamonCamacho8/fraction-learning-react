import { useState, useRef, useEffect, useCallback } from "react";
import { startRecording } from "../../utils/recordAudio";
import { useUser } from "../../Context/UserContext";
import { AudioRecord } from "../../utils/AudioRecord";

const siblingsIds = [
  "question-1-button",
  "question-2-button",
  "question-3-button"
]

const AudioRecorder = (props) => {
  
  const {audioName, permission, disabled, blobs, setBlobs, audiosInfo, setAudiosInfo} = props;
  
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [siblings, setSiblings] = useState([]);

  useEffect (() => {

    let elementsSiblings = []
    siblingsIds.forEach(sibling => {
      if(sibling !== audioName + '-button'){
        elementsSiblings.push(document.getElementById(sibling));
      }
    });
    setSiblings(elementsSiblings);

  }, []);
    
  const toggleButtons = (status) => {
    siblings.forEach(element => {
      element.disabled = status;
    });
  }

  const start = useCallback(() => {
    toggleButtons(true);
    setRecordingStatus("recording");
    AudioRecord.startRecording();
  }, [recordingStatus]);

  const stop = useCallback(() => {
    setRecordingStatus("inactive");
    toggleButtons(false);

    let time = 0;
    const tempBlob = AudioRecord.getBlob();
    AudioRecord.stopRecording();

    setBlobs({
      ...blobs,
      [audioName]: tempBlob
    });

    setAudiosInfo({
      ...audiosInfo,
      [audioName]: {
        ...audiosInfo[audioName],
        duration: time
      }
    });
    
    
  }, [recordingStatus]);

  const restart = useCallback(() => {
    setBlobs({
      ...blobs,
      [audioName]: null
    });

    setAudiosInfo({
      ...audiosInfo,
      [audioName]: {
        ...audiosInfo[audioName],
        duration: 0
      }
    });
  }, [blobs]);
  
  const handleStart = () => {

    toggleButtons(true);
    setRecordingStatus("recording");
    AudioRecord.startRecording();

  };

  const handleStop = () => {

    setRecordingStatus("inactive");
    toggleButtons(false);
    AudioRecord.stopRecording();
    const time = AudioRecord.getRecordingTime();

    setAudiosInfo({
      ...audiosInfo,
      [audioName]: {
        ...audiosInfo[audioName],
        duration: time
      }
    });
    
  };

  const handleRestart = () => {

    setBlobs({
      ...blobs,
      [audioName]: null
    });

    setAudiosInfo({
      ...audiosInfo,
      [audioName]: {
        ...audiosInfo[audioName],
        duration: 0
      }
    });
    

  };
  return (
    <>
      {
        recordingStatus === "inactive" ? (
          blobs[audioName] ? (
            <button id={audioName+'-button'} className="audio-button" onClick={restart} disabled={!(permission && !disabled)}>
              Reintentar
            </button>
          ) : (
            <button id={audioName+'-button'} className="audio-button" style={{position:'relative'}} onClick={start} disabled={!(permission && !disabled)}>
              Grabar
            </button>
          )
        ) : (
          <button id={audioName+'-button'} className="audio-button" onClick={stop} disabled={!(permission && !disabled)}>
            Detener
          </button>
        )
      }
          
    </>
  );
};

export default AudioRecorder;
