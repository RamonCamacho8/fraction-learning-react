import { testFunction, test_UploadJson } from "../../services/audio";

const Test = () => {
  return (
    <div>
      <button onClick={testFunction} >Test GET JSON</button>
      <button onClick={test_UploadJson} >Test POST JSON</button>
    </div>
  );
};

export default Test;
