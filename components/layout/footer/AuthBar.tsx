import Button from "@/components/inputs/Button";
import useSignInModal from "@/state/SignInModalState";
import useRegisterModal from "@/state/RegisterModalState";

export default function AuthBar() {
  const toggleSignInModal = useSignInModal((state) => state.toggleModal);
  const toggleRegisterModal = useRegisterModal((state) => state.toggleModal);
  return (
    <div className="fixed bottom-0 left-0  h-16 w-full  bg-blue-500 text-white">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5">
        <div className="hidden sm:block">
          <span className="text-xl font-bold">Stay up to date</span>
          <br />
          <span>Twitter users are the first to know the news.</span>
        </div>
        <div className="flex w-full items-center gap-x-3 sm:w-fit">
          <Button
            className="w-full"
            onClick={toggleSignInModal}
            text="Sign in"
            type="outlined"
          />
          <Button
            className="w-full"
            onClick={toggleRegisterModal}
            text="Register"
          />
        </div>
      </div>
    </div>
  );
}
