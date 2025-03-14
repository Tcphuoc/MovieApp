export default function Button({ children, className, type, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className} type={type} {...props}>
    {children}
  </button>
}
