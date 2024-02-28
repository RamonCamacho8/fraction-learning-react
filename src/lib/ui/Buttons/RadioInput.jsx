import audio from "../../../assets/sfx/button-Click.mp3";
const click = new Audio(audio);
export default function RadioInput({ value, id, setSelectedAnswer }) {


    const handleSelection = () => {
        click.load();
        click.play();
        setSelectedAnswer(id);
    }

    return (
      <div className="radio-button">
        <input type="radio" name="answer" value={value} id={id} onClick={handleSelection}/>
        <label htmlFor={id}><div className="label-text">
            <div>{value[0]}</div>
            <div className="divider"></div>
            <div>{value[1]}</div>
          </div></label>
      </div>
    );
}