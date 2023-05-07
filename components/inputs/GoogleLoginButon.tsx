import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
interface GoogleLoginButtonProps {}
export default function GoogleLoginButton({}: GoogleLoginButtonProps) {
  return (
    <div
      onClick={() => signIn("google")}
      className="mx-auto flex w-fit cursor-pointer items-center gap-x-5 rounded-xl bg-white p-3 text-black duration-200 hover:bg-gray-200"
    >
      <span>Sign in with Google</span>
      <FcGoogle size={25} />
    </div>
  );
}
