
const endpointROOT = 'http://localhost:5000/api';


const upload_audio = async (audioFile) => {
  
  if (audioFile){
    console.log(audioFile);
    const blobResponse = await fetch(audioFile);
    const blobData = await blobResponse.blob();
    const formData = new FormData();
    formData.append('audio', blobData, 'audio.mp3');

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