import React from "react";

export default function Search({ onSearch }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(event.target.elements.title.value);
      }}
    >
      <label>Search track name: </label>
      <input name="title" />
      <button type="submit">Search</button>
    </form>
  );
}
