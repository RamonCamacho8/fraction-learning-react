function Title(){
    return(
        <div className="title">
            <div className="tema">Tema de la clase:</div>
            <div className="titleField">Suma de fracciones</div>  
        </div>
        
    );
}

function ActualDate(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let fullDate = `${day} / ${months[month]} / ${year}`;

    return(
        <div>
            <div className="date">Fecha de hoy:</div>
            <div className="dateField">{fullDate}</div>
        </div>
        
    );
}

function Student({name}){
    name = name || "Invitado";
    return(
         <div className="student">
            <div className="studentName">Nombre del estudiante:</div>
            <div className="name">{name}</div>
        </div>
        
    );
}

export default function HeaderSection(){
    return(
        <div className="headerSection">
            <Title />
            <Student />
            <ActualDate />
        </div>
    );
}