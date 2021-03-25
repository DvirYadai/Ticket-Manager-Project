import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Ticket from "./Ticket";
import Header from "./Header";
import SortMenu from "./SortMenu";
import SnackBarError from "./SnackBarError";

export default function Main() {
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [counter, setCounter] = useState(0);
  const firstUpdate = useRef(true);
  const [copyTicketArr, setCopyTicketArr] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    (async function getAllTickets() {
      try {
        const res = await axios.get("/api/tickets");
        res.data.sort((a, b) => {
          return new Date(b.creationTime) - new Date(a.creationTime);
        });
        setTickets(res.data);
        setCopyTicketArr(res.data);
      } catch (error) {
        if (error.toJSON().message === "Network Error") {
          setIsServerDown(false);
          setOpenSnackBar(true);
        } else {
          setIsServerDown(true);
          setOpenSnackBar(true);
        }
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
        res.data.sort((a, b) => {
          return new Date(b.creationTime) - new Date(a.creationTime);
        });
        setTickets(res.data);
      } catch (error) {
        if (error.toJSON().message === "Network Error") {
          setIsServerDown(false);
          setOpenSnackBar(true);
        } else {
          setIsServerDown(true);
          setOpenSnackBar(true);
        }
      }
    })();
  }, [searchText]);

  return (
    <div id="main">
      <Header
        setSearchText={setSearchText}
        setTickets={setTickets}
        tickets={tickets}
        setCounter={setCounter}
        counter={counter}
        copyTicketArr={copyTicketArr}
        setOpenSnackBar={setOpenSnackBar}
        setIsServerDown={setIsServerDown}
      />
      <div className="tickets-div">
        <SortMenu setTickets={setTickets} tickets={tickets} />
        {tickets.map((ticket, i) => {
          return (
            <Ticket
              key={`ticketKey #${i}`}
              tickets={tickets}
              setTickets={setTickets}
              ticket={ticket}
              setCounter={setCounter}
              counter={counter}
              setOpenSnackBar={setOpenSnackBar}
              setIsServerDown={setIsServerDown}
            />
          );
        })}
      </div>
      <SnackBarError
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        isServerDown={isServerDown}
      />
    </div>
  );
}
