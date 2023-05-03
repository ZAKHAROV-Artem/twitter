import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  return (
    <div
      className={`flex h-12 w-full items-center rounded-3xl bg-app-gray-dark  ${
        isFocused ? "border border-blue-400" : "border-none"
      }`}
    >
      <BiSearch className="mx-3 text-app-gray" size={24} />
      <input
        className="w-full bg-transparent text-white outline-none "
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search Twitter"
      />
    </div>
  );
}
