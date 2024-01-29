import Layout from "@/components/Layout"
import Link from "next/link";
import TextArea from "@/components/textarea";
import Button from "@/components/button";
import AccuracyBar from "@/components/accuracy-bar";
import { useRouter } from 'next/router'
import { useState } from "react";
import axios from "axios";

export default function TaskDetail(props) {
  const router = useRouter()
  const { slug } = router.query
  const task = props;

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

    console.log(process.env.API_ENDPOINT_NEWS_TITLE)
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict-news", {
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
      console.log(e);
    }
    // console.log(results);
  }

  console.log(props)

  return (
    <>
      <Layout title={task.name}>
        <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-10 md:w-11/12 lg:w-4/6 mt-6 px-6 py-4 mx-0 md:mx-auto sm:rounded-lg">
          <div className="basis-1/2">
            <Link href="/" className="mt-3 flex flex-row gap-1 text-blue-700 hover:text-blue-500 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 self-center group-hover:-translate-x-1 transition duration-150 ease-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              <span className="font-medium text-sm">Back to Home</span>
            </Link>
            <h1 className="mt-5 mb-2 text-2xl font-bold text-black ">{task.name}</h1>
            <h2 className="mb-1 text-lg font-semibold text-black ">Overview Dataset</h2>
            <p className="mb-1 text-sm text-black ">
              Dataset Link: <span>
                <a 
                  href={task.details.dataset_link} 
                  target={"_blank"}
                  className="text-indigo-500 hover:text-blue-700">
                    kaggle.com/datasets/ibamibrahim/indonesian-news-title
                </a></span>
            </p>
            <p className="text-sm text-justify text-black">{task.details.description}</p>
          </div>
          <div className="basis-1/2">
          <div className="w-full p-5 rounded-lg border border-slate-200 shadow-md">
            <h3 className="text-base text-black font-bold mb-1">{"model/" + task.details.model}</h3>
            <h4 className="text-sm font-normal text-slate-400 mb-1">{task.task}</h4>
            <div className="mt-3 flex flex-col items-start">

              <div className="mb-3 w-full">
                <TextArea 
                  name="text" 
                  rows="4" 
                  placeholder="Your title text"
                  required={true}
                  onChange={(e) => setText(e.target.value)}
                />

                { textError == '' ? '' : <p className="mt-1 text-red-600 text-xs">{textError}</p> }
                { message == '' ? '' : <p className="mt-1 text-red-600 text-xs">{message}</p>}

              </div>
              
              <Button type="submit" onClick={submitTextTitle}>Compute</Button>

            </div>
            <p className="mb-4 text-slate-400 text-xs">Computation time on Intel Core i3 7th Gen Scalable cpu: cached and Nvidia GTX 1050Ti</p>

            { results.length > 0 ? results.map((result, i) => {
              return (
                <AccuracyBar key={i} label={result.label} value={(result.score * 100).toFixed(2)}/>
              )
            }) : null }

            <div className="mt-10 relative overflow-hidden">
              <input type={"checkbox"} className="peer w-24 absolute top-0 inset-x-0 opacity-0 z-10 cursor-pointer"/>
              <div className="mb-2 w-24 flex flex-row items-center gap-1 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 self-center text-slate-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                <h1 className="text-xs">JSON Output</h1>
              </div>

              <div className="absolute top-3 right-3 text-white transition-transform duration-500 ease-in-out rotate-0 peer-checked:rotate-180"></div>
              <div className="w-full bg-slate-100 text-slate-500 text-xs rounded-lg overflow-hidden transition-all duration-500 ease-in-out max-h-0 peer-checked:max-h-[50rem]">
                <div className="p-3">
                  <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
              </div>
            </div>

          </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tasks`);
  const tasks = await res.json();

  const paths = tasks.map((task) => ({
    params: {
      slug: task.slug
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const {slug} = context.params
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tasks/${slug}`);
  const task = await res.json();

  return {
    props: task,
  };
}