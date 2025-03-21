import { Container } from "@mui/material";

export default function CustomContainer({
  children,
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <Container
      className={className}
      sx={{
        margin: "12px 48px",
      }}
    >
      {children}
    </Container>
  );
}
