import "./style.css";
import { useLanguage } from "../../Context/LanguageContext";

import { ExercicesProvider } from "../../Context/ExercicesContext";
import { useEffect, useState } from "react";

export default function BoardV2({}) {

    const { languageData } = useLanguage();
    const headerTraduction = languageData["board"].headerPanel;
    
    const [date, setDate] = useState();

    useEffect(() => {
        const date = new Date();

        let fullDate = `${date.getDate()} / ${headerTraduction.months[date.getMonth()]} / ${date.getFullYear()}`;

        setDate(fullDate);
    }, []);


    return (
        <ExercicesProvider>
            <div className="board-container">
                <main className="board-v2">
                    <header>
                        <div className="student">
                            <h5>{headerTraduction.studentHolder}</h5>
                            <h6>User's Name</h6>
                        </div>
                        <div className="date">
                            <h5>{headerTraduction.date}</h5>
                            <h6>{date}</h6>
                        </div>
                        <div className="title">
                            <h1>{headerTraduction.title}</h1>
                            <h2>{headerTraduction.subject}</h2>
                        </div>
                    </header>
                    <section>

                    </section>
                    <footer>

                    </footer>
                </main>
            </div>
            
        </ExercicesProvider>
    );
}