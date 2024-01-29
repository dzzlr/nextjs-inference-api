export default function Logo({ fontColor }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="my-auto text-xl md:text-2xl">🧠</div>
      <div className={`${fontColor ? fontColor : 'text-black'} flex flex-col font-bold`}>
        <div className="text-sm md:text-base translate-y-1">Machine Learning</div>
        <div className="text-sm md:text-base -translate-y-1">Playground</div>
      </div>
    </div>
  )
}