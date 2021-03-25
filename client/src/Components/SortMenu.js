import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function SortMenu({ tickets, setTickets }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const oldToNew = () => {
    const tempTicketsArr = [...tickets];
    tempTicketsArr.sort((a, b) => {
      return new Date(a.creationTime) - new Date(b.creationTime);
    });
    setTickets(tempTicketsArr);
    setAnchorEl(null);
  };

  const newToOld = () => {
    const tempTicketsArr = [...tickets];
    tempTicketsArr.sort((a, b) => {
      return new Date(b.creationTime) - new Date(a.creationTime);
    });
    setTickets(tempTicketsArr);
    setAnchorEl(null);
  };

  return (
    <div className="sort-div">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Sort By Date:
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary="New to old" onClick={newToOld} />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Old to new" onClick={oldToNew} />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
