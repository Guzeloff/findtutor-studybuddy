import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import "./ContactTutor.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import ListItem from "@material-ui/core/ListItem";
import { useTheme } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Register from "./Register";
const useStyles = makeStyles({});

function SimpleDialog(props) {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <>
      {user == null ? (
        <>
          <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
          >
            <List style={{ textAlign: "center" }}>
              <Alert severity="warning">
                За да го исконтактирате туторот мора да бидете најавени
              </Alert>
              <Link to="/">
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<ExitToAppIcon />}
                >
                  Најави се
                </Button>
              </Link>
            </List>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
          >
            <DialogTitle id="simple-dialog-title">
              Информации за контакт
            </DialogTitle>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <EmailIcon color="secondary" /> {profile.email}
                </ListItemAvatar>
                <ListItemText />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <PhoneIcon color="secondary" /> {profile.telbroj}
                </ListItemAvatar>
                <ListItemText />
              </ListItem>
            </List>
          </Dialog>
        </>
      )}
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ContactTutor() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{ backgroundColor: "#4986fc", color: "white" }}
        variant="contained"
      >
        Контактирај ме{" "}
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default ContactTutor;
