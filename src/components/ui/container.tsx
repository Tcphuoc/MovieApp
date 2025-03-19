export default function Container({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return <div className={`py-3 px-12 ${className}`}>{children}</div>;
}
