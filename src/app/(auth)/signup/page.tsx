// 'use client';

// import { signin } from "@/lib/api/auth";
// import Button from "@/components/ui/button";
// import Input from "@/components/ui/input";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// export default function SignupPage() {
//   function signinHandler(formData: FormData) {
//     const account: string = formData.get('account') as string;
//     const password: string = formData.get('password') as string;

//     const result: boolean = signin({ account, password });
//     if (result) {
//       redirect("/signin");
//     } else {
//       return;
//     }
//   }

//   return <section>
//     <div className="bg-black w-120 py-15 px-20 mx-auto rounded-md mb-10">
//       <h2 className="font-bold">Sign In</h2>
//       <form action={signinHandler}>
//         <div className="flex min-lg:justify-between max-lg:flex-col">
//           <Input
//             label="First name"
//             id="first_name"
//             type="text"
//             className="my-5 min-lg:w-38"
//           />
//           <Input
//             label="Last name"
//             id="last_name"
//             type="text"
//             className="min-lg:w-38 min-lg:my-5"
//           />
//         </div>
//         <Input
//           label="Email or mobile number"
//           id="account"
//           type="text"
//           className="my-5"
//         />
//         <Input
//           label="Password"
//           id="password"
//           type="password"
//           className="my-5"
//         />
//         <Input
//           label="Password Confirmation"
//           id="password_confirm"
//           type="password"
//           className="my-5"
//         />
//         <Button className="btn-primary w-full p-2 rounded-md my-5" type="submit">Sign in</Button>
//       </form>
//       <div className="flex">
//         <p>New to Movie App?</p>
//         <Link className="font-bold text-white ml-2 hover:underline" href="/signup">Sign up now.</Link>
//       </div>
//     </div>
//   </section>
// }
