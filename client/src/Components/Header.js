import "../App.css";
import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewTicket from "./NewTicket";
import axios from "axios";

export default function Header({
  setSearchText,
  tickets,
  counter,
  setCounter,
  setTickets,
  copyTicketArr,
  setOpenSnackBar,
  setIsServerDown,
  userLogged,
  location,
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

  const logoutButton = () => {};

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
        className="add-button"
        onClick={handleClickOpen}
      />
      <NewTicket
        setOpen={setOpen}
        open={open}
        setTickets={setTickets}
        setOpenSnackBar={setOpenSnackBar}
        setIsServerDown={setIsServerDown}
      />
      <p>
        Showing {tickets.length} results {counter > 0 ? hiddenSpan : ""}
      </p>
      <p>{`Welcome, ${location.state.user}`}</p>
      <a href="/" onClick={() => axios.get("/api/user/logout")}>
        Log out
      </a>
    </div>
  );
}
