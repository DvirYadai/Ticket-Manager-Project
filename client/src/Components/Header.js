import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewTicket from "./NewTicket";

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
    setTickets(copyTicketArr);
    setCounter(0);
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
      <input
        id="searchInput"
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <AddCircleIcon
        color="primary"
        className="add-button"
        onClick={handleClickOpen}
      />
      <NewTicket setOpen={setOpen} open={open} />
      <p>
        Showing {tickets.length} results {counter > 0 ? hiddenSpan : ""}
      </p>
    </div>
  );
}
