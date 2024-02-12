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


const getPersonality_v3 = async (data) => {
  //To be implemented
  console.log(data);
  const response = await fetch( `${endpointROOT}/personality_v3` ,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  return response.json();

  /* return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        presentsOpenness : true,
        presentsNeuroticism : true
      });
    }, 1000);
  }); */

}

export { getPersonality, getPersonality_v2, getPersonality_v3};