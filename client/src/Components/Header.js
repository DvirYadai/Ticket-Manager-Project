import React from "react";

export default function Header({ setSearchText }) {
  return (
    <div>
      <h1>Tickets Manager</h1>
      <input
        id="searchInput"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </div>
  );
}
