import AudioRecorder from '../../components/HomeComponents/AudioRecorder';
import './style.css';

function Home({pApertura, setApertura, userName, setUserName}){
    return (
        <div className='container'>
            <div className='mainPanel'>
                <div className='title'>
                    <h1>Bienvenido a FractionLearning</h1>
                </div>
                <Login setUserName={setUserName} />
                <RecordPanel pApertura={pApertura} setApertura={setApertura}/>
            </div>
        </div>
    )
}

function Login({setUserName}){

    const handleChange = (e) => {
        setUserName(e.target.value);
    }
    
    return (
        <div className='login'>
            <h1>Nombre de Alumno</h1>
            <input type='text' placeholder='Escribe tu nombre aquí.' onChange={handleChange}/>
        </div>
    )
}


function RecordPanel({pApertura, setApertura}){



    return (
       
        <AudioRecorder pApertura={pApertura} setApertura ={setApertura} />
     
    )

}

export default Home;