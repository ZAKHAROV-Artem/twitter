import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export default function ArrowBack() {
  const router = useRouter();
  return (
    <div onClick={()=>router.back()} className="ml-5 flex h-12 cursor-pointer items-center duration-150 hover:ml-3">
      <BsArrowLeft color="white" size={35} />
    </div>
  );
}
