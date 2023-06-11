import { useRouter } from "next/router";

export default function ServerError() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-6xl  text-white">500</div>
      <div className="mt-3 px-3 text-center text-blue-400">
        {`Hmm... It is my bad. Sorry :)`}
      </div>
    </div>
  );
}
