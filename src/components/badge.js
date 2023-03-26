export default function Badge({ className, children }) {
  return (
    <span 
    className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  )
}