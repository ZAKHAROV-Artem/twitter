import localFont from "next/font/local";
import Header from "@/components/layout/header/Header";
import Spinner from "@/components/feedback/Spinner";

const twitter = localFont({ src: "../public/fonts/Twitter.woff2" });

export default function Home() {
  return (
    <div className={twitter.className}>
      <div className="relative">
        <Header />
        <div className=" text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae
          rem, ipsa, repellat omnis labore quas deleniti, laudantium eius
          ratione mollitia in natus! Reiciendis est sequi aspernatur
          voluptatibus aliquam eius alias autem iure, rem non iusto cupiditate
          suscipit quis dolorum earum rerum, veniam labore deserunt, numquam
          possimus repellat nemo. Similique, ullam.
        </div>
      </div>
    </div>
  );
}
