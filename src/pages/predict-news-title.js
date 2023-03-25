import TextArea from "@/components/textarea";
import Button from "@/components/button";
import AccuracyBar from "@/components/accuracy-bar";
import { useState } from "react";
import axios from "axios";

export default function PredictNewsTitle() {
  const [showJSON,setShowJSON] = useState(false);
  const [text,setText] = useState('');
  const [results, setResults] = useState([]);

  const submitTextTitle = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict-news', {
        text: text
      }, {
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
      },
      )
      const data_response = await res;
      const {result} = data_response.data.data;
      // console.log(result);
      setResults(result);
    } catch (e) {
      console.log(e);
    }
    // console.log(results);
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

                { results.length > 0 ? results.map((result, i) => {
                  return (
                    <div key={i}>
                      <AccuracyBar label={result.label} value={(result.score * 100).toFixed(2)}/>
                    </div>
                  )
                }) : null }


                <button 
                  onClick={() => {
                    setShowJSON(!showJSON);
                  }}
                  className="mt-10 text-slate-400 text-xs font-mono transition duration-150 ease-out"
                  >
                  {"</> JSON Output"}
                </button>

                { 
                  showJSON ? 
                  <div className="mt-2 w-full p-3 bg-slate-100 text-slate-500 text-xs font-mono rounded-lg transition duration-150 ease-out">
                    {/* { results.length > 0 ? results : null } */}
                    {JSON.stringify(results)}
                  </div>
                  : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
