import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
export default function PieFraction({ numerador, denominador, color }) {
    


    const partAngle = 360 / denominador;
    color = getColor(denominador);
   
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


const getColor = (number) => {
  let colors = {
    2 : "rgb(255, 0, 0)",
    3 : "rgb(251, 128, 0)",
    4 : "rgb(247, 255, 0)",
    5 : "rgb(128, 255, 0)",
    6 : "rgb(4, 225, 128)",
    7 : "rgb(0, 195, 255)",
    8 : "rgb(9, 98, 255)",
    9 : "rgb(134, 0, 255)",
    10 : "rgb(251, 0, 255)",
    11 : "rgb(253, 0, 136)",
    12 : "rgb(255, 99, 132)",
    13 : "rgb(255, 205, 86)",
    14 : "rgb(54, 162, 235)"
  }

  return colors[number];
}