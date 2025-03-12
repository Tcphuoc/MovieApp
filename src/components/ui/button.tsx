export default function Button({ children, className }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={className}>
    {children}
  </button>
}
