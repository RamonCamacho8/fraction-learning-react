const endpointROOT = 'http://localhost:5000/api';


const getPersonality = async () => {
    let response_ = null;
    
    await fetch( `${endpointROOT}/personality` ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response_ = response.json();
    })
    return response_;

  }

export { getPersonality };