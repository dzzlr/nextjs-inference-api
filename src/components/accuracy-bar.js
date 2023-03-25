export default function AccuracyBar({ label, value }) {
  return (
    <div>
      <div className="mt-1 flex justify-between">
        <h5 className="text-slate-500 font-medium font-mono text-xs">{label}</h5>
        <h5 className="text-slate-400 font-light font-mono text-xs">{value}%</h5>
      </div>
      <div className="mt-1 w-full h-2 rounded-md bg-slate-100">
        <div className={`w-[${value}%] h-2 rounded-md bg-indigo-400`}></div>
      </div>
    </div>
  )
}