
const endpointROOT = 'http://localhost:5000/api';


const upload_audio = async (audioFile, audioName = 'test_2') => {
  let ext = 'mp3';
  audioName = `${audioName}.${ext}`

  if (audioFile){
    console.log(audioFile);
    const blobResponse = await fetch(audioFile);
    const blobData = await blobResponse.blob();
    const formData = new FormData();
    formData.append('audio', blobData, audioName);

    fetch(`${endpointROOT}/audio/upload`,{
      method: 'POST',
        body: formData
      }).catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('No file selected');
  }
}

export { upload_audio };