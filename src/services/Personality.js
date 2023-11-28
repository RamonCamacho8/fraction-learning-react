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
    }).catch(error => {
      console.error('Error:', error);
    });
    return response_;

  }

const getPersonality_v2 = async () => {
  let response_ = null;
  
  await fetch( `${endpointROOT}/personality_v2` ,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    response_ = response.json();
  }).catch(error => {
    console.error('Error:', error);
  });
  return response_;

}

export { getPersonality, getPersonality_v2 };