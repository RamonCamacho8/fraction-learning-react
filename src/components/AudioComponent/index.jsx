import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const mimeType = "audio/wav";

const urlPersonalidad = "https://apinet.hopto.org/fractionlearning/emocion";
const urlUpload = "https://apinet.hopto.org/fractionlearning/upload";

const localURLPersonalidad = "http://127.0.0.1:5000/persontext";
const localURLUpload = "http://127.0.0.1:5000/upload";

const getTextFromServer = async (navigate, setApertura, setNeuroticismo) => {
  await fetch(localURLPersonalidad, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // You can add other headers if needed
    },
  })
    .then((response) => {
      // Check if the response status is OK (200)
      if (response.status === 200) {
        console.log("Success");
        return response.json(); // Parse the response body as JSON
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then((data) => {
      // Handle the JSON data here
      console.log(data["apertura"]);
      console.log(data["neuroticismo"]);
      setApertura(data["apertura"] === "No" ? false : true);
      setNeuroticismo(data["neuroticismo"] === "No" ? false : true);
      navigate("/board");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const audioUpload = async (
  e,
  audio,
  navigate,
  setApertura,
  setNeuroticismo
) => {
  e.preventDefault();

  const blobResponse = await fetch(audio);
  const blobData = await blobResponse.blob();
  const formData = new FormData();
  formData.append("audio", blobData);

  try {
    const response = await fetch(localURLUpload, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      getTextFromServer(navigate, setApertura, setNeuroticismo);
      console.log("Archivo de audio subido con éxito.");
    } else {
      console.error("Error al subir el archivo de audio.");
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};

function AudioRecorder({
  setApertura,
  setNeuroticismo,
  permissionText,
  recordText,
  stopText,
  sendText,
  recordAgainText,
  setInstruction,

}) {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const navigate = useNavigate();

  const handleStart = () => {
    startRecording();
    setInstruction(2);
  }

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

  const handleStop = () => {
    stopRecording();
    setInstruction(3);
  }

  const stopRecording = () => {
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

  const handlePermisison = async () => {
    getMicrophonePermission();
    setInstruction(1);
  };

  const getMicrophonePermission = async () => {
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

  return (
    <div className="audio">
      <div className="audio-buttons">
        {!permission ? (
          <button onClick={handlePermisison} type="button">
            {permissionText}
          </button>
        ) : null}

        {permission && recordingStatus === "inactive" ? (
          <button onClick={handleStart} type="button">
            {audio ? recordAgainText : recordText}
          </button>
        ) : null}

        {recordingStatus === "recording" ? (
          <button onClick={handleStop} type="button">
            {stopText}
          </button>
        ) : null}
        {(audio && recordingStatus === "inactive") ? (
          <div>
            <form
              onSubmit={(e) =>
                audioUpload(e, audio, navigate, setApertura, setNeuroticismo)
              }
            >
              <button type="submit">{sendText}</button>
            </form>
          </div>

        ) : null}

      </div>

      {(audio && recordingStatus === "inactive") ? (
        <div className="audio-player">
          <audio src={audio} controls></audio>
        </div>
      ) : null}
    </div>
  );
}

export default AudioRecorder;
