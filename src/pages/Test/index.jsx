import "./style.css";
import { testAddDoc, testGetDocs } from "../../FirestoreTest";
import { useEffect } from "react";

const Test = () => {

  /*useEffect(() => {
    testGetDocs().then((response) => {
      console.log(response);
    });
  }, []);*/

  const handleTestAdd = () => {
    const response = testAddDoc();
    console.log(response);
  };

  const handleTestGet = () => {
    const response = testGetDocs();
    console.log(response);
  };

  return (
    <div className="container">
      <button onClick={handleTestAdd}>Add Docs</button>
      <button onClick={handleTestGet}>Get Docs</button>
    </div>
  );
};

export default Test;
