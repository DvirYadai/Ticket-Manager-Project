import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import { isMobile } from "react-device-detect";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  DeleteForever,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function Ticket({
  tickets,
  setTickets,
  ticket,
  setCounter,
  counter,
  setOpenSnackBar,
  setIsServerDown,
}) {
  const [showLess, setShowLess] = useState(true);
  const [done, setDone] = useState(ticket.done);
  const [showButtons, setShowButtons] = useState(false);
  let history = useHistory();

  const hideButton = (e) => {
    const target = e.target.parentNode.parentNode;
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
        if (error.response.data.massage === "Unauthorized user") {
          history.push("/");
        } else if (error.toJSON().message === "Network Error") {
          setIsServerDown(false);
          setOpenSnackBar(true);
        } else {
          setIsServerDown(true);
          setOpenSnackBar(true);
        }
      }
    } else {
      try {
        await axios.patch(`/api/tickets/${ticket._id}/done`);
        setDone(true);
      } catch (error) {
        if (error.response.data.massage === "Unauthorized user") {
          history.push("/");
        } else if (error.toJSON().message === "Network Error") {
          setIsServerDown(false);
          setOpenSnackBar(true);
        } else {
          setIsServerDown(true);
          setOpenSnackBar(true);
        }
      }
    }
  };

  const deleteButton = async () => {
    try {
      const res = await axios.delete(`/api/tickets/${ticket._id}`);
      res.data.sort((a, b) => {
        return new Date(b.creationTime) - new Date(a.creationTime);
      });
      setTickets(res.data);
    } catch (error) {
      if (error.response.data.massage === "Unauthorized user") {
        history.push("/");
      } else if (error.toJSON().message === "Network Error") {
        setIsServerDown(false);
        setOpenSnackBar(true);
      } else {
        setIsServerDown(true);
        setOpenSnackBar(true);
      }
    }
  };

  return (
    <div
      className="ticket"
      onMouseEnter={isMobile ? null : () => setShowButtons(true)}
      onMouseLeave={isMobile ? null : () => setShowButtons(false)}
    >
      {isMobile ? (
        <div className="ticket-buttons">
          <button className="hideTicketButton" onClick={(e) => hideButton(e)}>
            Hide
          </button>
          {done ? (
            <CheckBox
              fontSize="large"
              className="done-button"
              onClick={doneButton}
            />
          ) : (
            <CheckBoxOutlineBlank
              fontSize="large"
              className="done-button"
              onClick={doneButton}
            />
          )}
          <DeleteForever
            fontSize="large"
            className="delete-button"
            onClick={deleteButton}
          />
        </div>
      ) : (
        showButtons && (
          <div className="ticket-buttons">
            <button className="hideTicketButton" onClick={(e) => hideButton(e)}>
              Hide
            </button>
            {done ? (
              <CheckBox
                fontSize="large"
                className="done-button"
                onClick={doneButton}
              />
            ) : (
              <CheckBoxOutlineBlank
                fontSize="large"
                className="done-button"
                onClick={doneButton}
              />
            )}
            <DeleteForever
              fontSize="large"
              className="delete-button"
              onClick={deleteButton}
            />
          </div>
        )
      )}
      <h3>{ticket.title}</h3>
      <p>
        {showLess && ticket.content.length > 400
          ? `${ticket.content.slice(0, 400)}...`
          : ticket.content}
      </p>
      {ticket.content.length > 400 ? (
        <span className="show-more-span" onClick={() => setShowLess(!showLess)}>
          {showLess ? "Show more.." : "Show less.."}
        </span>
      ) : null}
      <div className="ticket-info">
        <p>{`By ${ticket.userEmail} | ${new Date(
          ticket.creationTime
        ).toLocaleString()}`}</p>
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
      <hr />
    </div>
  );
}
