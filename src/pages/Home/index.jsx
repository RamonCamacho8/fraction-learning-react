import AudioRecorder from '../../components/HomeComponents/AudioRecorder';
import './style.css';

function Home(){
    return (
        <div className='container'>
            <div className='mainPanel'>
                <div className='title'>
                    <h1>Bienvenido a FractionLearning</h1>
                </div>
                <Login />
                <RecordPanel />
            </div>
        </div>
    )
}

function Login(){
    return (
        <div className='login'>
            <h1>Nombre de Alumno</h1>
            <input type='text' placeholder='Escribe tu nombre aquí.' />
        </div>
    )
}


function RecordPanel(){



    return (
        
        <AudioRecorder />
        
    )

}

export default Home;