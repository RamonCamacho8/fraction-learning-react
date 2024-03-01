import "./style.css";
import { getDocsQuantity } from "../../services/Firestore";
import { getConfigurationDoc } from "../../services/Configuration";
import { useEffect, useState } from "react";
import { AudioRecord } from "../../utils/AudioRecord";


const Test = () => {


  useEffect(()=>{
    AudioRecord.getMicrophonePermission();
  },[])

  const handleBlob = () => {
    console.log(AudioRecord.getBlob());
  }

  return (
    <div className="container">
      <button onClick={AudioRecord.startRecording}>Start</button>
      <button onClick={AudioRecord.stopRecording}>Stop</button>
      <button onClick={handleBlob}>Blob</button>
    </div>
  );
};

export default Test;
