import "../App.css";
import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import NewTicket from "./NewTicket";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();

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

  const logoutUserButton = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      if (res.status === 200) history.push("/");
    } catch (err) {
      console.log(err);
    }
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
      {/* <p>{`Welcome, ${location.state.user}`}</p> */}
      <button onClick={logoutUserButton}>Log out</button>
    </div>
  );
}
