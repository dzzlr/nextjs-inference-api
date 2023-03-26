export default function TextArea({
  name, 
  rows, 
  className = '', 
  placeholder,
  autoComplete,
  required = true,
  value,
  onChange
}) {
  return (
    <textarea
      name={name} 
      rows={rows} 
      value={value}
      className={
        `block p-2.5 w-full text-sm text-black bg-white rounded-lg
        border border-slate-200 focus:ring-slate-200 focus:border-slate-200 ` + className
      }
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  )
}