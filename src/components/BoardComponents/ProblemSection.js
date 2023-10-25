import 'chart.js/auto';
import '../styles/ProblemSection.css'
import { Pie } from 'react-chartjs-2';

export default function ProblemSection({pApertura}){
    return(
        <div className="problemSection">
            <ResultPanel result={10} />
            <ProcedurePanel pApertura={pApertura} dificultad={3}/>
        </div>
    );
}

function ResultPanel({result}){

    return(

        <div className="resultPanel">
            <div >
                <input type='number' className="numerator" min="0"/>
                <div className="fractionBar">----</div>
                <input type='number' className="denominator" min="1"/>
            </div>
            
        </div>


    );
}

function ProcedurePanel({dificultad, pApertura}){
    
    let fractionsNumbers = fractionsGenerator({dificultad: 3, cantidad: 2});
    let fractionsComponents = fractionComponentsGenerator({pApertura: pApertura, fractionsNumbers: fractionsNumbers, colorType: 'mono' });
    

    dificultad = dificultad || 1;

    return (
        <div className="procedurePanel">
            {fractionsComponents}
        </div>
    );
}



//Fraction Components

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
            offset: 15,
            //borderDash : Array(numerador).fill(1).map((i) => i* Math.floor(Math.random() * 10) + 1),
            
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

function Symbol({symbol}){
    return(
        <div className="SymbolComponent">
            <div className="Symbol">{symbol}</div>
        </div>
    );
}


//Functions for fraction components
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

function fractionComponentSelector({pApertura}){

    switch(pApertura){
        case true:
            return FractionPieChartComponent;
        case false:
            return FractionNumberComponent;
        default:
            return FractionNumberComponent;
    }

}

function fractionComponentsGenerator({pApertura, fractionsNumbers, colorType = 'mono'}){

    let Component = fractionComponentSelector({pApertura: pApertura});
    let fractionsComponents = [];
    fractionsNumbers = fractionsNumbers || [[2,4],[1,4]];

    for(let i = 0; i < fractionsNumbers.length; i++){
        const [numerador, denominador] = fractionsNumbers[i];
        const symbol = i ===  fractionsNumbers.length - 1 ? "=" : "+";
        const componetKey = `${i} + ${numerador}/${denominador}`;
        const symbolKey = `${i} + ${symbol}`;

        fractionsComponents.push(<Component key={componetKey} numerador={numerador} denominador={denominador}  color = {colorSelector({colorOption:colorType})}/>, <Symbol key={symbolKey} symbol={symbol} />);
    }

    return fractionsComponents;


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
