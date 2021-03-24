import React, { useState } from "react";
import axios from "axios";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";

export default function Ticket({
  tickets,
  setTickets,
  ticket,
  setCounter,
  counter,
}) {
  const [showLess, setShowLess] = useState(true);
  const [done, setDone] = useState(false);

  const hideButton = (e) => {
    const target = e.target.parentNode;
    const ticketArr = Array.from(document.querySelectorAll(".ticket"));
    const ticketIndex = ticketArr.indexOf(target);
    const tempTicketsArr = [...tickets];
    tempTicketsArr.splice(ticketIndex, 1);
    setTickets(tempTicketsArr);
    setCounter(counter + 1);
  };

  const doneButton = async () => {
    if (done) {
      try {
        await axios.patch(`/api/tickets/${ticket._id}/undone`);
        setDone(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.patch(`/api/tickets/${ticket._id}/done`);
        setDone(true);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="ticket">
      <button className="hideTicketButton" onClick={(e) => hideButton(e)}>
        Hide
      </button>
      <button className="done-button" onClick={doneButton}>
        {done ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </button>
      <h1>{ticket.title}</h1>
      <p>
        {showLess && ticket.content.length > 400
          ? `${ticket.content.slice(0, 400)}...`
          : ticket.content}
      </p>
      {ticket.content.length > 400 ? (
        <span onClick={() => setShowLess(!showLess)}>
          {showLess ? "see more" : "see less"}
        </span>
      ) : null}
      <div className="ticket-info">
        <p>{`By ${ticket.userEmail} | ${ticket.creationTime}`}</p>
        {ticket.labels ? (
          <ul>
            {ticket.labels.map((label, i) => {
              return (
                <li className="label" key={`labelKey #${i}`}>
                  {label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
