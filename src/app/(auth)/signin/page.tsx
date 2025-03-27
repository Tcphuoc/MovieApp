import SigninForm from "@/app/(auth)/signin/SigninForm";
import Link from "next/link";

export default function SigninPage() {
  return <>
    <h2 className="font-bold">Sign In</h2>
    <SigninForm />
    <div className="flex">
      <p>New to Movie App?</p>
      <Link
        className="font-bold text-white ml-2 hover:underline"
        href="/signup"
      >
        Sign up now.
      </Link>
    </div>
  </>;
}
