import "./style.css";
import { getDocsQuantity } from "../../services/Firestore";
import { getConfigurationDoc } from "../../services/Configuration";
import { useState } from "react";

const Test = () => {


  const handleClick = () => {
    getConfigurationDoc().then((data) => {
      console.log(data);
    });
    
  }

  return (
    <div className="container">
      <button onClick={handleClick}>Test</button>
    </div>
  );
};

export default Test;
