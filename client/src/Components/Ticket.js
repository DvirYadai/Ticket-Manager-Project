import React from "react";

export default function Ticket({
  tickets,
  setTickets,
  ticket,
  setCounter,
  counter,
}) {
  const hideButton = (e) => {
    const target = e.target.parentNode;
    target.classList.add("hidden");
    const ticketArr = Array.from(document.querySelectorAll(".ticket"));
    const ticketIndex = ticketArr.findIndex(
      (ticket) => ticket.className === "ticket hidden"
    );
    target.classList.remove("hidden");
    const tempTicketsArr = [...tickets];
    console.log(tickets);
    tempTicketsArr.splice(ticketIndex, 1);
    console.log(tickets);
    setTickets(tempTicketsArr);
    setCounter(counter + 1);
  };

  return (
    <div className="ticket">
      <button className="hideTicketButton" onClick={(e) => hideButton(e)}>
        Hide
      </button>
      <h1>{ticket.title}</h1>
      <p>{ticket.content}</p>
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
