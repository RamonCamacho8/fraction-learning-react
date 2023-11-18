import { test_get_text, test_post_text, test_post_json, test_get_json } from "../../services/test";
import "./style.css";
import { useState } from "react";
const Test = () => {

  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className="audio-container">
      <button onClick={test_get_text} >GET TEXT</button>
      <button onClick={test_post_text} >POST TEXT</button>
      <div>
        <h2>JSON</h2>
        <input type="text" placeholder="key" value={key} onChange={(e) => setKey(e.target.value)} />
        <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={test_get_json} >GET JSON</button>
        <button onClick={() =>test_post_json({[key]:value})} >POST JSON</button>
      </div>
    </div>
  );
};

export default Test;
