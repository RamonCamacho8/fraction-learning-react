import "./style.css";
import { testAddDoc, testGetDocs } from "../../services/Firestore";
import { useState } from "react";
import { uploadImage } from "../../services/CloudStorage";

const Test = () => {

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [born, setBorn] = useState(0);

  //Load and image as a File from the assets folder
  const image = new File(["./assets/images/fractions/1.png"], "1.png");
  console.log(image);

  const handleTestAdd = () => {
    console.log(first, last, born);
    console.log(typeof born);
    const response = testAddDoc(first, last, parseInt(born));
    console.log(response);
  };

  const handleImageUpload = async (e) => {

    
    const url = await uploadImage(image);
    
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
      <button onClick={handleImageUpload}>Subir imagen</button>
    </div>
  );
};

export default Test;
