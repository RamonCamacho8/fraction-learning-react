import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
export default function PieFraction({ numerador, denominador, color }) {
    
    const partAngle = 360 / denominador;
    color = color;
   

    const data = {
      labels: [],
      datasets: [
        {
          label: `${numerador}/${denominador}`,
          data: Array(denominador).fill(1),
          backgroundColor: [
            ...Array(numerador).fill(color),
            ...Array(denominador - numerador).fill("rgb(39, 76, 67)"),
          ],
          borderColor: [
            ...Array(numerador).fill("white"),
            ...Array(denominador - numerador).fill("white"),
          ],
          offset: 15,
        },
      ],
    };
  
    const options = {
      cutout: 0,
      radius: "100%", // Change this value to set the desired radius
      circumference: 360,
      rotation: Math.floor(Math.random() * 4) * partAngle,
      animation: {
        animateRotate: false,
        animateScale: false,
      },
    };
    
    const [optionsState, setOptions] = useState(options);
    const [dataState, setDataState] = useState(data);
  
    return (
      <div className="pie-fraction">
        <Pie data={dataState} options={optionsState} />
      </div>
    );
  }