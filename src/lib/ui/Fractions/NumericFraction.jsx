function NumericFraction({ numerador, denominador }) {
    return (
      <div className="fraction">
        <div className="numerator"> {numerador} </div>
        <div className="divider"></div>
        <div className="denominator"> {denominador} </div>
      </div>
    );
  }

export default NumericFraction;