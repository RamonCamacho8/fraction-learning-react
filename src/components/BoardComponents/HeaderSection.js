function Title({title, subject}){
    return(
        <div className="title">
            <div className="tema">{title}</div>
            <div className="titleField">{subject}</div>  
        </div>
        
    );
}

function ActualDate({dateName, monthsList}){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const months = monthsList

    let fullDate = `${day} / ${months[month]} / ${year}`;

    return(
        <div>
            <div className="date">{dateName}</div>
            <div className="dateField">{fullDate}</div>
        </div>
        
    );
}

function Student({name, nameHolder}){
    name = name || "Invitado";
    return(
         <div className="student">
            <div className="studentName">{nameHolder}</div>
            <div className="name">{name}</div>
        </div>
        
    );
}

export default function HeaderSection({name, text}){
    return(
        <div className="headerSection">
            <Title title={text.title} subject={text.subject} />
            <Student name={name} nameHolder={text.studentHolder} />
            <ActualDate dateName={text.date} monthsList={text.months} />
        </div>
    );
}