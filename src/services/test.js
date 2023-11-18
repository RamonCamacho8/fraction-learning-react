
const endpointROOT = 'http://localhost:5000/api';


const test_get_text = () => {

  fetch( `${endpointROOT}/test/get/text ` ,{
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain', // You may need to adjust the content type based on your server's requirements
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log(data); // "Hola mundo"
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

const test_get_json = () => {
  
    fetch( `${endpointROOT}/test/get/json ` ,{
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
      console.log(data); // { "texto": "Hola mundo" }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

const test_post_text = () => {

    let data = "texto";
    
    fetch(`${endpointROOT}/test/post/text`,{
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // You may need to adjust the content type based on your server's requirements
      },
      body: data,
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('Error:', error);
    });
}

const test_post_json = ( json ) => {

  let data = json || {"texto": "texto"} ;

  fetch(`${endpointROOT}/test/post/json`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // You may need to adjust the content type based on your server's requirements
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  }).then(data => {
    console.log(data);
  }).catch(error => {
    console.error('Error:', error);
  });
}


export { test_get_text,test_get_json, test_post_text, test_post_json }