
let mediaRecorder;
const mimeType = "audio/mp3";
let audioChunks = [];
let url;
let permissions = false;
let recordingTime = 0;
let startTime = 0;
let endTime = 0;
let blob;
const constraints = { audio: true, video: false};
export const AudioRecord = {

    getMicrophonePermission : async () => {
        if(navigator.mediaDevices)
            console.log('getUserMedia supported.');
        
        try{

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('Permission granted');
            permissions = true;
            mediaRecorder = new MediaRecorder(stream, { type : mimeType });

        } catch(err){
            console.log('Permission denied');
            permissions = false;
        }

        return permissions;   
    },
    startRecording : () => {
        
        if(mediaRecorder.state === 'recording')
            return;
        mediaRecorder.addEventListener('dataavailable', onDataAvailable);
        mediaRecorder.addEventListener('stop', onStop);
        mediaRecorder.start();
        startTime = new Date().getTime();
    },
    stopRecording : () => {

        endTime = new Date().getTime();
        recordingTime = endTime - startTime;
        mediaRecorder.stop();
        
    },
    closeSession : () => {
        mediaRecorder.removeEventListener('dataavailable', onDataAvailable);
        mediaRecorder.removeEventListener('stop', onStop);
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        mediaRecorder = null;
    },
    getBlob : () => {
        console.log(audioChunks);
        blob = new Blob(audioChunks, { type: mimeType });
        console.log(blob);
        return blob;
    },
    getRecordingTime : () => {
        //console.log(recordingTime);
        return recordingTime;
    },
    resetBlob : () => {
        blob = null;
    }

};

const onDataAvailable = (event) => {
    audioChunks.push(event.data);
}

const onStop = async () => {
    /* blob = new Blob(audioChunks, { type: mimeType });
    url = URL.createObjectURL(blob);
    const blobResponse = await fetch (url);
    blob = await blobResponse.blob(); */
    //audioChunks = [];
}