import Header from "@/components/layout/header/Header";
import Feed from "@/components/layout/posts/Feed";


export default function Home() {
  
  return (
    <div className="relative">
      <Header text="Home" />
      <Feed/>
    </div>
  );
}
