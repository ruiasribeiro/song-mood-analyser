import { SearchIcon } from "@heroicons/react/solid";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  handleSearch: (query: string) => void;
}

function SearchBox(props: Props) {
  let [query, setQuery] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (query.length > 0) {
      props.handleSearch(query);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 bg-white rounded-full w-60"
        onChange={handleChange}
      />
      <button type="submit">
        <SearchIcon className="inline-block w-6 mx-2" />
      </button>
    </form>
  );
}

export default SearchBox;
