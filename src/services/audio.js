
const endpointROOT = 'http://localhost:5000/api';


const upload_audio = (audioFile) => {
  
  if (audioFile){
    console.log(audioFile);
    const formData = new FormData();
    formData.append('audioFile', audioFile);

    fetch(`${endpointROOT}/audio/upload`,{
      method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('No file selected');
  }
}

export { upload_audio };