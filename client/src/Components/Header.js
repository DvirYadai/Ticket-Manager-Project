import "../App.css";
import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewTicket from "./NewTicket";
import SortMenu from "./SortMenu";

export default function Header({
  setSearchText,
  tickets,
  counter,
  setCounter,
  setTickets,
  copyTicketArr,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const restoreButton = () => {
    copyTicketArr.sort((a, b) => {
      return new Date(b.creationTime) - new Date(a.creationTime);
    });
    setTickets(copyTicketArr);
    setCounter(0);
  };

  const hiddenSpan = (
    <span>
      (<span id="hideTicketsCounter">{counter}</span> hidden tickets -{" "}
      <button id="restoreHideTickets" onClick={restoreButton}>
        restore
      </button>{" "}
      )
    </span>
  );

  return (
    <div id="header">
      <h1>Tickets Manager</h1>
      <input
        placeholder="Search tickets by title"
        id="searchInput"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <AddCircleIcon
        fontSize="large"
        // color="primary"
        className="add-button"
        onClick={handleClickOpen}
      />
      <NewTicket setOpen={setOpen} open={open} setTickets={setTickets} />
      <p>
        Showing {tickets.length} results {counter > 0 ? hiddenSpan : ""}
      </p>
      <SortMenu setTickets={setTickets} tickets={tickets} />
    </div>
  );
}
