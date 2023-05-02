import { HOME } from "@/routes/routes";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";

export default function SidebarLogo() {
  const router = useRouter();
  return (
    <div
      className="mt-5 w-fit cursor-pointer rounded-full p-4 duration-200 
    hover:bg-slate-300/20"
      onClick={() => router.push(HOME)}
    >
      <AiOutlineTwitter size={32} color="white" />{" "}
    </div>
  );
}
