export default function Button({ type = 'submit', onClick, className = '', processing, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `mb-2 px-5 py-1 lg:py-2 rounded-md text-black text-sm font-normal outline outline-1 
        bg-gradient-to-t from-slate-100 to-white outline-slate-200 
        focus:ring-4 focus:ring-blue-300 hover:shadow-inner duration-150 ease-in-out ` + className
      }
    >
      {children}
    </button>
  )
}