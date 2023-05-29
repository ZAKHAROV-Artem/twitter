import useDebounce from "@/hooks/useDebounce";
import useUserSearch from "@/hooks/useUserSearch";
import fetchSearchUsers from "@/services/user/fetchSearchUsers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchUser from "../data-display/SearchUser";

export default function SearchInput() {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { users } = useUserSearch(query);

  return (
    <div
      className={`relative flex h-12 w-full items-center rounded-3xl bg-app-gray-dark  ${
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
      <div className={`absolute top-[115%] left-[-20%] duration-300 max-h-96 overflow-y-scroll rounded-md shadow-gray w-[120%]  bg-black ${users ? "opacity-100" : "opacity-0"}`}>
        {users?.map((user) => (
          <SearchUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
