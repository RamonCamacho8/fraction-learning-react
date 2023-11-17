const testFunction = () => {

  fetch('http://localhost:5000/api/test',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // You may need to adjust the content type based on your server's requirements
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // "Hola mundo"
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

const test_UploadJson = () => {

    let data = "texto";
    
    const formData = new FormData();
    formData.append('text', data);

    fetch('http://localhost:5000/api/testUploadJson',{
        method: 'POST',
        body: formData,
        })
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
        }
        )
        .then(data => {
        console.log(data); // "Hola mundo"
        }
        )
        .catch(error => {
        console.error('Error:', error);
        }

        );  
    
}

export { testFunction, test_UploadJson }