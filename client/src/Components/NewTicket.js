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
import { useHistory } from "react-router-dom";

export default function NewTicket({
  setOpen,
  open,
  setTickets,
  setOpenSnackBar,
  setIsServerDown,
}) {
  let history = useHistory();
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
    console.log(titleRef.current.value);
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
          />
          <TextField
            required
            margin="dense"
            id="content"
            variant="outlined"
            label="Content"
            rows="3"
            multiline
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
          <TextField
            margin="dense"
            id="labels"
            label="Ticket labels"
            fullWidth
            onChange={(e) => (newTicket.labels = e.target.value.split(" "))}
            helperText={`Please separate each label with space`}
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
