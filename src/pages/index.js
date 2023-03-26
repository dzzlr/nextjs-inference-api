import Layout from "@/components/Layout"
import CardTask from "@/components/card-task"
import Badge from "@/components/badge"
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No tasks data</p>

  return (
    <>
      <Layout title="Home">
        <div className="flex flex-col gap-5 lg:gap-10 w-11/12 lg:w-4/6 mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
          <div className="justify-start">
            <h1 className="mb-5 lg:mb-10 text-lg md:text-2xl text-black font-extrabold">Welcome to ML Playground (API Inference)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              
              { data.length > 0 ? data.map((result, i) => {
                return (
                  <CardTask href={result.url} key={i}>
                    <div className="flex flex-row">
                      { result.category == 'NLP' ? <Badge className={'bg-yellow-100 text-yellow-600'}>{result.category}</Badge> : null }
                      { result.category == 'OCR' ? <Badge className={'bg-blue-100 text-blue-800'}>{result.category}</Badge> : null }
                      { result.status == 'Ready' ? <Badge className={'bg-green-100 text-green-800'}>{result.status}</Badge> : null }
                      { result.status == 'On Develop' ? <Badge className={'bg-red-100 text-red-800'}>{result.status}</Badge> : null }
                    </div>
                    <div className="w-full h-20"></div>
                    <h3 className="text-base text-black font-bold">{result.name}</h3>
                    <h4 className="text-sm font-normal text-slate-400">{result.task}</h4>
                  </CardTask>
                )
              }) : null }
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
