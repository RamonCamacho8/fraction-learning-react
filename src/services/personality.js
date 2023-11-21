const endpointROOT = 'http://localhost:5000/api';


const getPersonality = () => {
  
    fetch( `${endpointROOT}/personality` ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // { "texto": "Hola mundo" }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

export { getPersonality };