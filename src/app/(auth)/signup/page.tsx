import SignupForm from "@/features/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return <>
    <h2 className="font-bold">Sign Up</h2>
    <SignupForm />
    <div className="flex">
      <p>Have an exist email?</p>
      <Link
        className="font-bold text-white ml-2 hover:underline"
        href="/signin"
      >
        Sign in.
      </Link>
    </div>
  </>;
}
