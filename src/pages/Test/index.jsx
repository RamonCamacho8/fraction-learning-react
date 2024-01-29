import "./style.css";
import { testAddDoc, testGetDocs } from "../../FirestoreTest";
import { useState } from "react";

const Test = () => {

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [born, setBorn] = useState(0);

  const handleTestAdd = () => {
    console.log(first, last, born);
    console.log(typeof born);
    const response = testAddDoc(first, last, parseInt(born));
    console.log(response);
  };

  const handleTestGet = () => {
    const response = testGetDocs();
    console.log(response);
  };

  return (
    <div className="container">
      <form>
        <label>Nombre</label>
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <label>Apellido</label>
        <input
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <label>Edad</label>
        <input
          type="number"
          value={born}
          onChange={(e) => {
            setBorn(e.target.value)
          }}
        />
      </form>
      <br></br>
      <button onClick={handleTestAdd}>Agregar</button>
    </div>
  );
};

export default Test;
