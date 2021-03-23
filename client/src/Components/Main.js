import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import axios from "axios";

export default function Main() {
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get("/api/tickets");
      setTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {tickets.map((ticket, i) => {
        console.log(ticket.labels);
        return <Ticket ticket={ticket} key={`ticketKey #${i}`} />;
      })}
    </div>
  );
}
