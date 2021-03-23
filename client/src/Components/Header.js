import React from "react";
import axios from "axios";

export default function Header({
  setSearchText,
  tickets,
  counter,
  setCounter,
  setTickets,
}) {
  const restoreButton = async () => {
    try {
      const res = await axios.get("/api/tickets");
      setTickets(res.data);
      setCounter(0);
    } catch (error) {
      console.log(error);
    }
  };

  const hiddenSpan = (
    <span>
      (<span id="hideTicketsCounter">{counter}</span> hidden tickets -{" "}
      <button id="restoreHideTickets" onClick={restoreButton}>
        restore
      </button>
      )
    </span>
  );

  return (
    <div>
      <h1>Tickets Manager</h1>
      <p>
        Showing {tickets.length} results {counter > 0 ? hiddenSpan : ""}
      </p>
      <input
        id="searchInput"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </div>
  );
}
