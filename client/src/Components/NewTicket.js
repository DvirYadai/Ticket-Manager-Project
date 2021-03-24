import "../App.css";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";

export default function NewTicket({ setOpen, open, setTickets }) {
  const newTicket = {
    title: "",
    content: "",
    userEmail: "",
    done: false,
    creationTime: new Date(),
    labels: [],
  };

  let titleRef = {};
  let contentRef = {};
  let emailRef = {};

  const handleClose = () => {
    setOpen(false);
  };

  const submitButton = async () => {
    if (
      titleRef.current.reportValidity() &&
      contentRef.current.reportValidity() &&
      emailRef.current.reportValidity()
    ) {
      try {
        const res = await axios.post("/api/tickets/post", newTicket);
        res.data.sort((a, b) => {
          return new Date(b.creationTime) - new Date(a.creationTime);
        });
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      }
      setOpen(false);
    }
  };

  return (
    <div id="new-ticket">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below, notice the require fields!
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            inputRef={titleRef}
            onChange={(e) => (newTicket.title = e.target.value)}
            helperText="At least 10 character"
          />
          <TextField
            required
            margin="dense"
            id="content"
            label="Content"
            fullWidth
            inputRef={contentRef}
            onChange={(e) => (newTicket.content = e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            inputRef={emailRef}
            onChange={(e) => (newTicket.userEmail = e.target.value)}
            helperText={`Must include '@'`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitButton} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
