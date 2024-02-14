
export default function RadioInput({ value, id, setSelectedAnswer }) {
  
    return (
      <div className="radio-button">
        <input type="radio" name="answer" value={value} id={id} onClick={() => {
          setSelectedAnswer(id);
        }}/>
        <label htmlFor={id}><div className="label-text">
            <div>{value[0]}</div>
            <div className="divider"></div>
            <div>{value[1]}</div>
          </div></label>
      </div>
    );
}