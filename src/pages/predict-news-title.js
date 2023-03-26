import Link from "next/link";
import TextArea from "@/components/textarea";
import Button from "@/components/button";
import AccuracyBar from "@/components/accuracy-bar";
import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";

export default function PredictNewsTitle() {
  const [showJSON, setShowJSON] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);

  const submitTextTitle = async () => {
    if (text.length < 10) {
      if (text.length == 0) {
        setTextError('This field cannot be left blank')
        return;
      }
      setTextError('The length of character must be greater than 10 char')
      return;
    }

    try {
      const res = await axios.post(process.env.API_ENDPOINT_NEWS_TITLE, {
        text: text
      }, {
        timeout: 4000,
        headers: {
          'Content-Type': 'application/json'
        },
      },
      )
      const data_response = await res;
      const {result} = data_response.data.data;
      setResults(result);
    } catch (e) {
      setMessage('Connection refused to endpoint');
      // console.log(e);
    }
    // console.log(results);
  }


  return (
    <>
      <Layout title="Predict Indonesia News Title">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-11/12 lg:w-4/6 mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
          <div className="basis-1/2">
            <Link href="/" className="mt-3 flex flex-row gap-1 text-blue-700 hover:text-blue-500 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 self-center group-hover:-translate-x-1 transition duration-150 ease-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              <span className="font-medium text-sm">Back to Home</span>
            </Link>
            <h1 className="mt-5 text-2xl text-black font-mono font-extrabold mb-2">API Inference News Title</h1>
            <h2 className="mb-1 text-lg text-black font-bold">Overview Dataset</h2>
            <p className="mb-1 text-black text-sm">
              Dataset Link: <span>
                <a 
                  href="https://www.kaggle.com/datasets/ibamibrahim/indonesian-news-title" 
                  target={"_blank"}
                  className="text-indigo-500 hover:text-blue-700">
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

                <div className="mb-3 w-full">
                  <TextArea 
                    name="text" 
                    rows="4" 
                    placeholder="Your title text"
                    required={true}
                    onChange={(e) => setText(e.target.value)}
                  />

                  { textError == '' ? '' : (
                    <p className="mt-1 text-red-600 text-xs">{textError}</p>
                  )
                  }

                  { message == '' ? '' : (
                    <p className="mt-1 text-red-600 text-xs">{message}</p>
                  )
                  }
                </div>
                
                <Button type="submit" onClick={submitTextTitle}>Compute</Button>

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
                  {JSON.stringify(results)}
                </div>
                : null }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
