import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

export default function ProblemSection(){
    return(
        <div className="problemSection">
            <ResultPanel result={10} />
            <ProcedurePanel personalidad={2} dificultad={3}/>
        </div>
    );
}

function ResultPanel({result}){

    return(

        <div className="resultPanel">
            <input type='number' className="numerator" min="0"/>
            <div className="fractionBar">----</div>
            <input type='number' className="denominator" min="1"/>
        </div>


    );
}



function FractionNumberComponent({numerador, denominador}){

    return(
        <div className="fraction">
            <div className="numerator">{numerador} </div>
            <div className="fractionBar">----</div>
            <div className="denominator" min="1">{denominador} </div>
        </div>
        
    );
}




function FractionPieChartComponent({numerador, denominador, colors}){
    const numeroDePartes = numerador;

    const partAngle = 360 / denominador;
    const fullAngle = partAngle * numeroDePartes;
    
    const color = colors[Math.floor(Math.random() * colors.length)];

    const data = {
        labels: [],
        datasets: [{
            label: `${numeroDePartes}/${denominador}`,
            data: Array(numeroDePartes).fill(1),
            backgroundColor: Array(numeroDePartes).fill(color),
        }]
      };
    
      const options = {
        cutout: 0,
        radius: "100%", // Change this value to set the desired radius
        circumference: fullAngle,
        rotation: 0,

      };


    return(
        <div className="pieFraction">  
            <Pie data={data} options={options}/> 
        </div>
        
    );
}


function ProcedurePanel({dificultad, personalidad}){

    let fractionsComponents = [];
    let fractions = [];
    personalidad = personalidad || 1;
    dificultad = dificultad || 1;

    let Component = personalidad !== 1 ? FractionPieChartComponent : FractionNumberComponent;
    let colors = personalidad === 1 ? ['rgb(39, 76, 67)'] : ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'] 
    console.log(colors);
    
    for(let i = 0; i < 2; i++){
        const [numerador, denominador] = fractionGenerator(dificultad);
        fractions.push((numerador/denominador))
        fractionsComponents.push(<Component key={`${i} + ${numerador}/${denominador}`} numerador={numerador} denominador={denominador} colors={colors} />);
        const symbol = i == 1 ? "=" : "+";
        fractionsComponents.push(<Symbol key={`${i} + ${symbol}`} symbol={symbol} />)
    }

    const totalFraction = fractions.reduce((a, b) => a + b, 0);
    console.log(totalFraction);

    return (
        <div className="procedurePanel">
            {fractionsComponents}
        </div>
    );
}

function Symbol({symbol}){
    return(
        <div className="SymbolComponent">
            <div className="Symbol">{symbol}</div>
        </div>
    );
}


function fractionGenerator(dificultad){

    const localDificultad = dificultad || 1;

    let numerador = 0;
    let denominador = 1;

    switch(localDificultad){
        case 1:
           
            denominador = Math.floor(Math.random() * 4) + 1;
            numerador = Math.floor(Math.random() * denominador);
            
        break
        case 2:
            denominador = Math.floor(Math.random() * 9) + 1;
            numerador = Math.floor(Math.random() * denominador);
            
        break
        case 3:
            denominador = Math.floor(Math.random() * 14) + 1;
            numerador = Math.floor(Math.random() * denominador);
            
        break
        default:
            numerador = 0;
            denominador = 1;
    }

    numerador = numerador > 0 ? numerador : 1;

    return [numerador, denominador];
}