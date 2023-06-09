import useUserSearch from "@/hooks/useUserSearch";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchUser from "../data-display/SearchUser";

export default function SearchInput({
  list = "popup",
}: {
  list?: "list" | "popup";
}) {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { users } = useUserSearch(query);

  return (
    <div className="w-full">
      <div
        className={`${
          list === "list" ? "sticky top-16" : "relative"
        }  flex h-12 w-full items-center ${
          list === "popup" ? "rounded-3xl" : "rounded-none"
        } bg-app-gray-dark  ${
          isFocused ? "border border-blue-400" : "border-none"
        }`}
      >
        <BiSearch className="mx-3 text-app-gray" size={24} />
        <input
          className="w-full  bg-transparent text-white outline-none "
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search Twitter"
        />
        {list === "popup" && (
          <div
            className={`absolute left-[-20%] top-[115%] z-50 max-h-96 w-[120%] overflow-y-scroll rounded-md bg-black shadow-gray  duration-300 ${
              users ? "opacity-100" : "opacity-0"
            }`}
          >
            {users?.map((user) => (
              <SearchUser key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
      {list === "list" && (
        <div
          className={`mt-5  rounded-md bg-black shadow-gray  duration-300 ${
            users ? "opacity-100" : "opacity-0"
          }`}
        >
          {users?.map((user) => (
            <SearchUser key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
