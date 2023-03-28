import Layout from "@/components/Layout"
import CardTask from "@/components/card-task"
import Badge from "@/components/badge"

export default function Home(props) {
  const {tasks} = props;

  return (
    <>
      <Layout title="Home">
        <div className="flex flex-col gap-5 lg:gap-10 w-11/12 lg:w-4/6 mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
          <div className="justify-start">
            <h1 className="mb-5 lg:mb-10 text-lg md:text-2xl text-black font-extrabold">Welcome to ML Playground (API Inference)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              
              { tasks.map(task => {
                return (
                  <CardTask href={task.url} key={task._id}>
                    <div className="flex flex-row">
                      { task.category == 'NLP' ? <Badge className={'bg-yellow-100 text-yellow-600'}>{task.category}</Badge> : null }
                      { task.category == 'OCR' ? <Badge className={'bg-blue-100 text-blue-800'}>{task.category}</Badge> : null }
                      { task.status == 'Ready' ? <Badge className={'bg-green-100 text-green-800'}>{task.status}</Badge> : null }
                      { task.status == 'On Develop' ? <Badge className={'bg-red-100 text-red-800'}>{task.status}</Badge> : null }
                    </div>
                    <div className="w-full h-20"></div>
                    <h3 className="text-base text-black font-bold">{task.name}</h3>
                    <h4 className="text-sm font-normal text-slate-400">{task.task}</h4>
                  </CardTask>
                )
              })}
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/tasks`);
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  }
}