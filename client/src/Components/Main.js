import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Ticket from "./Ticket";
import Header from "./Header";

export default function Main() {
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [counter, setCounter] = useState(0);
  const firstUpdate = useRef(true);

  useEffect(() => {
    (async function getAllTickets() {
      try {
        const res = await axios.get("/api/tickets");
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    (async function getSpecificTicket() {
      try {
        const res = await axios.get(`/api/tickets?searchText=${searchText}`);
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchText]);

  return (
    <div>
      <Header
        setSearchText={setSearchText}
        setTickets={setTickets}
        tickets={tickets}
        setCounter={setCounter}
        counter={counter}
      />
      {tickets.map((ticket, i) => {
        return (
          <Ticket
            key={`ticketKey #${i}`}
            tickets={tickets}
            setTickets={setTickets}
            ticket={ticket}
            setCounter={setCounter}
            counter={counter}
          />
        );
      })}
    </div>
  );
}
