import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const mimeType = "audio/wav";

function AudioRecorder({pApertura, setApertura}) {

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const navigate = useNavigate();

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

  const stopRecording =  () => {
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

  const getTextFromServer = async () => {
    await fetch('http://127.0.0.1:5000/persontext', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers if needed
      },
    })
      .then(response => {
        // Check if the response status is OK (200)
        if (response.status === 200) {
          console.log('Success');
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        // Handle the JSON data here
        console.log(data['apertura']);
        setApertura(data['apertura'] == 'No' ? false : true);
        navigate('/board');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const blobResponse = await fetch(audio);
    const blobData = await blobResponse.blob()
    const formData = new FormData();
    formData.append('audio', blobData);

    try {

      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        getTextFromServer();
        console.log('Archivo de audio subido con éxito.');
      } else {

        console.error('Error al subir el archivo de audio.');
      }
    } catch (error) {

      console.error('Error de red:', error);
    }
  };

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
              <form onSubmit={handleSubmit}>
                  <button type="submit">Subir</button>
              </form>
            </div>
            </>
            
        ) : null}

      </div>
    </div>
  );
};

export default AudioRecorder;
