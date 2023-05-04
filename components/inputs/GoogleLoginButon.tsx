import { FcGoogle } from "react-icons/fc";

interface GoogleLoginButtonProps {}
export default function GoogleLoginButton({}: GoogleLoginButtonProps) {
  return (
    <div className="mx-auto flex w-fit cursor-pointer items-center gap-x-5 rounded-xl bg-white p-3 text-black duration-200 hover:bg-gray-200">
      <span>Continue with google</span>
      <FcGoogle size={25} />
    </div>
  );
}
