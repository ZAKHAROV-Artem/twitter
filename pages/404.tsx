import Button from "@/components/inputs/Button";
import { HOME } from "@/routes/routes";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-6xl  text-white">404</div>
      <div className="mt-3 px-3 text-center text-blue-400">
        Hmm...this page doesn’t exist. Try searching for something else.
      </div>
      <Button
        variant="filled"
        text="Search"
        className="mt-3"
        onClick={() => router.push(HOME)}
      />
    </div>
  );
}
