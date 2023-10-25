import { useState, useRef } from "react";
const mimeType = "audio/webm";

function AudioRecorder() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  async function stopRecording () {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  async function getMicrophonePermission () {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const sendAudio = () => {
    console.log("Sending audio");
    console.log(audio);
  }

  return (
    <div className="audio-section">
      <h2>Audio Recorder</h2>
      <div className="audio">
        <div className="audio-controls">

          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Otorgar permisios de microfono
            </button>
          ) : null}

          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Empezar grabacion
            </button>
          ) : null}

          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Parar grabacion
            </button>
          ) : null}
          
        </div>

        {audio ? (
            <>
            <div className="audio-container">
                <audio src={audio} controls></audio>
            </div>
            <div>
                <button onClick={sendAudio}>Enviar</button>
            </div>
            </>
            
        ) : null}

      </div>
    </div>
  );
};

export default AudioRecorder;
