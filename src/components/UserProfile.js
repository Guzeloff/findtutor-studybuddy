import { Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./UserProfile.css";

//materialUI

import LocationOnIcon from "@material-ui/icons/LocationOn";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

import PostQuestion from "./PostQuestion";

function UserProfile() {
  const profile = useSelector((state) => state.profile);

  return (
    <>
      <Paper className="profileWrapper">
        <div className="profileUser">
          <div>
            <img
              className="profile-image"
              src={profile.profilePic}
              alt="profilepicture"
            />
          </div>
          <hr />
          <div className="profile-details">
            <Typography color="primary" variant="h6">
              {profile.fullName}
            </Typography>
            <Typography
              className="profile-details-typo"
              paragraph={true}
              color="textPrimary"
              variant="subtitle1"
            >
              <AlternateEmailIcon color="secondary" />
              {profile.username}
            </Typography>
            <Typography
              className="profile-details-typo"
              paragraph={true}
              color="textPrimary"
              variant="subtitle1"
              style={{ textTransform: "capitalize" }}
            >
              <LocationOnIcon color="secondary" />
              {profile.grad}
            </Typography>
            <Typography
              className="profile-details-typo"
              color="textPrimary"
              variant="subtitle1"
              paragraph={true}
            >
              <CalendarTodayIcon color="secondary" />
              Joined {dayjs(profile.createdAt).format("MMM YYYY")}
            </Typography>
          </div>
        </div>
      </Paper>
      <PostQuestion />
    </>
  );
}

export default UserProfile;
