import TextArea from "@/components/textarea";
import Button from "@/components/button";
import AccuracyBar from "@/components/accuracy-bar";
import { useState } from "react";
import { axios } from "axios";

export default function PredictNewsTitle() {
  const [showJSON,setShowJSON] = useState(false);
  const [text,setText] = useState('');

  // const addTask = () => {
  //   // 👇 Send a fetch request to Backend API.
  //   fetch("http://127.0.0.1:8000/predict-news", {
  //     method: "POST",
  //     mode: 'no-cors',
  //     body: JSON.stringify({
  //       text: "Kylian Mbappe akan segera bergabung dengan Real Madrid pada bursa transfer musim dingin mendatang",
  //     }),
  //     headers: {
  //       // 'Access-Control-Allow-Origin': "*",
  //       // 'Access-Control-Allow-Methods': "POST",
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //   .then(function(response){ 
  //     return response.json()})
  //   .then(function(data) {
  //     console.log(data)})
  //   .catch(error => console.error('Error:', error)); 
  // };

  const submitTextTitle = async () => {
    console.log(text)
    // axios
    //   .post('http://127.0.0.1:8000/predict-news', {text: "Charles Leclerc masih kesulitan dalam mengangkat performa Ferrari pada musim ini"})
    //   .then((resp) => {
    //     console.log(resp)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const response = await fetch('http://127.0.0.1:8000/predict-news', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Origin': 'http://localhost:3000/',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({text: "Charles Leclerc masih kesulitan dalam mengangkat performa Ferrari pada musim ini"})
      });
      const data = await response.json();

      if (!response.ok) {
        // throw new Error(`Error! status: ${response.status}`);
        console.log(data);
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error)
    }

    // try {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'GET',
    //     // mode: 'no-cors',
    //     headers: {
    //       // 'Access-Control-Allow-Origin': 'POST',
    //       'Content-type': 'application/json'
    //     }
    //     // body: JSON.stringify({text: "Charles Leclerc masih kesulitan dalam mengangkat performa Ferrari pada musim ini"})
    //   });
    //   const data = await response.json();

    //   if (!response.ok) {
    //     // throw new Error(`Error! status: ${response.status}`);
    //     console.log(data);
    //     return;
    //   }
    //   console.log(data);
    // } catch (error) {
    //   console.log(error)
    // }
  }


  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 lg:pt-14 lg:pb-14">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-11/12 lg:w-4/6 mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
            <div className="basis-1/2">
              <h1 className="text-2xl text-black font-mono font-extrabold mb-2">API Inference News Title</h1>
              <h2 className="mb-1 text-lg text-black font-bold">Overview Dataset</h2>
              <p className="mb-1 text-black text-sm">
                Dataset Link: <span>
                  <a 
                    href="https://www.kaggle.com/datasets/ibamibrahim/indonesian-news-title" 
                    target={"_blank"}
                    className="text-indigo-500 hover:text-indigo-600">
                      kaggle.com/datasets/ibamibrahim/indonesian-news-title
                  </a></span>
              </p>
              <p className="text-black text-sm text-justify">This datasets contains more than 90.000 Indonesian News Title collected from detik.com, one of the biggest Indonesian news portal. The motivation behind this dataset is to enrich the resource in Indonesian NLP environment. This dataset is also very suitable for beginners to start working on real world data!</p>
            </div>
            <div className="basis-1/2">
              <div className="w-full p-5 rounded-lg border border-slate-200 shadow-md">
                <h3 className="text-base text-black font-bold mb-1">model/svm-tfidf</h3>
                <h4 className="text-sm font-normal text-slate-400 mb-1">Text Classification</h4>
                {/* <div className="mt-3 flex flex-col items-start" onSubmit={(e) => {e.preventDefault(); addTask();}}> */}
                <div className="mt-3 flex flex-col items-start">

                  <TextArea 
                    name="text" 
                    rows="4" 
                    placeholder="Your title text"
                    onChange={(e) => setText(e.target.value)}
                  />
                  
                  <Button 
                    type="submit"
                    onClick={submitTextTitle}
                    >Compute
                  </Button>

                </div>
                <p className="mb-4 text-slate-400 text-xs">Computation time on Intel Core i3 7th Gen Scalable cpu: cached and Nvidia GTX 1050Ti</p>

                <div className="">
                  <AccuracyBar label="finance" value="0.7"/>
                  <AccuracyBar label="food" value="0.3"/>
                  <AccuracyBar label="health" value="0.2"/>
                  <AccuracyBar label="inet" value="0.4"/>
                  <AccuracyBar label="oto" value="1"/>
                  <AccuracyBar label="sport" value="95.9"/>
                  <AccuracyBar label="travel" value="1.4"/>
                </div>

                <button 
                  onClick={()=>{
                    setShowJSON(!showJSON);
                  }}
                  className="mt-10 text-slate-400 text-xs font-mono transition duration-150 ease-out"
                  >
                  {"</> JSON Output"}
                </button>

                { 
                  showJSON ? 
                  <div className="mt-2 w-full p-3 bg-slate-100 text-slate-500 text-xs font-mono rounded-lg transition duration-150 ease-out">
                    Computation time on Intel Core i3 7th Gen Scalable cpu: cached and Nvidia GTX 1050Ti 
                  </div>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
