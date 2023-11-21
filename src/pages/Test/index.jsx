import { test_get_text, test_post_text, test_post_json, test_get_json } from "../../services/test";
import { upload_audio } from "../../services/audio";
import "./style.css";
import { useState } from "react";
import AudioRecorder from "../../components/AudioRecorder";
import { getPersonality } from "../../services/personality";

const Test = () => {

  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  return (
    <div className="audio-container">
      
      <div>
        <h2>TEXT</h2>
        <input type="text" placeholder="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={test_get_text} >GET TEXT</button>
        <button onClick={() => test_post_text(text) } >POST TEXT</button>
      </div>

      <div>
        <h2>JSON</h2>
        <input type="text" placeholder="key" value={key} onChange={(e) => setKey(e.target.value)} />
        <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={getPersonality} >GET JSON</button>
        <button onClick={() =>test_post_json({[key]:value})} >POST JSON</button>
      </div>

      <div>
        <h2>AUDIO</h2>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={() => upload_audio(audioFile)} >POST AUDIO</button>
      </div>

      <div>
        <h2>RECORDER</h2>
        <AudioRecorder />
      </div>

    </div>
  );
};

export default Test;
