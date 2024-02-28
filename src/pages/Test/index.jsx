import "./style.css";
import { getDocsQuantity } from "../../services/Firestore";
import { useState } from "react";

const Test = () => {


  const handleClick = () => {
    getDocsQuantity().then((size) => {
      console.log(size);
    }
    );
  }

  return (
    <div className="container">
      <button onClick={handleClick}>Test</button>

    </div>
  );
};

export default Test;
