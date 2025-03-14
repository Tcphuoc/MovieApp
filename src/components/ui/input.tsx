type InputProps = {
  label: string,
  error: string,
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ label, id, className, error, ...props }: InputProps) {
  return <div className={`flex flex-col ${className}`}>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} className={`border-1 p-2 rounded-md ${error ? 'border-red-700' : undefined}`} {...props} />
    {error && <p className="text-red-700 text-xs">{ error }</p>}
  </div>
}
