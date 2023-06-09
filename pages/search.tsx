import SearchInput from "@/components/inputs/SearchInput";
import Header from "../components/layout/header/Header";

export default function Search() {
 
  return (
    <div>
      <Header text="Search" />
    <SearchInput list="list"/>
    
    </div>
  );
}
