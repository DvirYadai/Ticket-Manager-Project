import React from "react";

export default function Ticket({ ticket }) {
  return (
    <div className="ticket">
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
