// fetch('http://127.0.0.1:8000/predict-news', {
//   method: 'POST',
//   body: JSON.stringify({
//     text: "Kylian Mbappe akan segera bergabung dengan Real Madrid pada bursa transfer musim dingin mendatang",
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   }
//   })
//   .then(function(response){ 
//     return response.json()})
//   .then(function(datas) {
//     const {data} = datas;
//     console.log(data)})
//   .catch(error => console.error('Error:', error)); 

// const response = fetch('http://127.0.0.1:8000/predict-news', {
//   method: 'POST',
//   body: JSON.stringify({text: "Kylian Mbappe akan segera bergabung dengan Real Madrid pada bursa transfer musim dingin mendatang"}),
//   // mode: 'no-cors',
//   headers: {
//     // 'Access-Control-Allow-Origin': "*",
//     // "Access-Control-Allow-Credentials" : true,
//     'Content-Type': 'application/json'
//   }
// })
// const {data} = response
// console.log(data)

const newText = {text: "Kylian Mbappe akan segera bergabung dengan Real Madrid pada bursa transfer musim dingin mendatang"}

const clickHandler = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/predict-news', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newText)
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data.data);
      return;
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

clickHandler()