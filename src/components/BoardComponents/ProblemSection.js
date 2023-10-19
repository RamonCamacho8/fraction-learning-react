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



function FractionPieChartComponent({numerador, denominador, color}){
    
    const partAngle = 360 / denominador;
    const fullAngle = partAngle * numerador;
    color = color || colorSelector({colorOption: 'multi'});

    const data = {
        labels: [],
        datasets: [{
            label: `${numerador}/${denominador}`,
            data: Array(numerador).fill(1),
            backgroundColor: Array(numerador).fill(color),
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

function FractionNumberComponent({numerador, denominador}){

    return(
        <div className="fraction">
            <div className="numerator">{numerador} </div>
            <div className="fractionBar">----</div>
            <div className="denominator" min="1">{denominador} </div>
        </div>
        
    );
}

function colorSelector({colorOption}){

    const color = colorOption || 'mono';
    const definedColors = ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)']
    switch(color){
        case 'mono':
            return 'rgb(39, 76, 67)';
        case 'multi':
            return definedColors[Math.floor(Math.random() * definedColors.length)];
        default:
            return 'rgb(39, 76, 67)';
    }

}

function fractionComponentSelector({option}){

    switch(option){
        case 'number':
            console.log("number");
            return FractionNumberComponent;
        case 'pie':
            return FractionPieChartComponent;
        default:
            return FractionNumberComponent;
    }

}

function fractionComponentsGenerator({componentOption, fractionsNumbers, colorType = 'mono'}){

    let Component = fractionComponentSelector({option: componentOption});
    let fractionsComponents = [];
    fractionsNumbers = fractionsNumbers || [[2,4],[1,4]];
    let fractions = [];

    for(let i = 0; i < fractionsNumbers.length; i++){
        const [numerador, denominador] = fractionsNumbers[i];
        const symbol = i ===  fractionsNumbers.length - 1 ? "=" : "+";
        const componetKey = `${i} + ${numerador}/${denominador}`;
        const symbolKey = `${i} + ${symbol}`;

        fractions.push((numerador/denominador))
        fractionsComponents.push(<Component key={componetKey} numerador={numerador} denominador={denominador}  colorType = {colorSelector({colorOption:colorType})}/>, <Symbol key={symbolKey} symbol={symbol} />);
    }

    return [fractionsComponents, fractions];


}



function ProcedurePanel({dificultad, personalidad}){

    let test = Array(100).fill();
    test = test.map(() => Math.floor(Math.random()*(5))+1);
    
    
    let fractionsNumbers = fractionsGenerator({dificultad: 3, cantidad: 2});

    let [fractionsComponents, fractions] = fractionComponentsGenerator({componentOption: 'pie', fractionsNumbers: fractionsNumbers, colorType: 'multi' });
    

    personalidad = personalidad || 1;
    dificultad = dificultad || 1;

    //const totalFraction = fractions.reduce((a, b) => a + b, 0);

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


function fractionsGenerator({dificultad, cantidad}){
    
    dificultad = dificultad || 3;
    let rango = 2;
    let fractionsNumbers = [];

    let numerador = 0;
    let denominador = 1;

    switch(dificultad){
        case 1:
            rango = 5;
            //Mismo denominador, diferente numerador
            denominador = Math.floor(Math.random() * (rango-1)) + 2;
            
            for(let i = 0; i < cantidad; i++){
                numerador = Math.floor(Math.random() * (denominador)) + 1;
                fractionsNumbers.push([numerador,denominador]);
            }
            
        break
        case 2:
            //Diferente denominador, diferente numerador, mismo rango
            rango = 5;
            for(let i = 0; i < cantidad; i++){
                denominador = Math.floor(Math.random() * (rango-1)) + 2;
                numerador = Math.floor(Math.random() * (denominador)) + 1;
                fractionsNumbers.push([numerador,denominador]);
            }
            
        break
        case 3:
            //Mismo denominador, diferente numerador, rango diferente
            rango = 10;
            
            for(let i = 0; i < cantidad; i++){
                denominador = Math.floor(Math.random() * (rango-1)) + 2;
                numerador = Math.floor(Math.random() * (denominador)) + 1;
                fractionsNumbers.push([numerador,denominador]);
            }
            
        break
        default:
            numerador = 0;
            denominador = 1;
    }
    return fractionsNumbers;
}


function fractionGenerator({dificultad}){
    console.log(dificultad);
    dificultad = dificultad || 3;

    let numerador = 0;
    let denominador = 1;

    switch(dificultad){
        case 1:
           
            denominador = Math.floor(Math.random() * 4) + 1;
            numerador = Math.floor(Math.random() * denominador);
            
        break
        case 2:
            denominador = Math.floor(Math.random() * 9) + 1;
            numerador = Math.floor(Math.random() * denominador)+1;
            
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
    console.log(numerador, denominador);
    return [numerador, denominador];
}