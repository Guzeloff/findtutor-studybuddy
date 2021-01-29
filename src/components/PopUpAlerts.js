import React from "react";
import "./PopUpAlerts.css";

import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

function PopUpAlerts({ alert }) {
  return (
    <div className="fade-in">
      <Alert severity="warning">
        {alert} <Link to="/">најавени</Link>
      </Alert>
    </div>
  );
}

export default PopUpAlerts;
