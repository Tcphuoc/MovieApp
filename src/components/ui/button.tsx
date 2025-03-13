export default function Button({ children, className, type }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className} type={type}>
    {children}
  </button>
}
