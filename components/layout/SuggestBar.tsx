import SearchInput from "../inputs/SearchInput";

export default function SuggestBar() {
  return (
    <div className="hidden flex-col items-center p-3 lg:flex">
      <SearchInput />
    </div>
  );
}
