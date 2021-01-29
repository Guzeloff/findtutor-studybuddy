import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GradeIcon from "@material-ui/icons/Grade";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import "./Profile.css";
import ContactTutor from "./ContactTutor";

function Profile(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  let { username } = useParams(""); //samo za da raboti ako usero manualno vnese url primer /profile/anngelguzelov33

  useEffect(() => {
    db.collection("Profile")
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        let usernav = snapshot.docs.map((user) => user.id)[0];
        db.collection("Profile")
          .doc(usernav)
          .get()
          .then((snapshot) => {
            dispatch({
              type: "USER_PROFILE",
              payload: snapshot.data(),
            });
            setLoading(false);
          });
      })
      .catch((e) => {
        history.push("");
      });
  }, []);
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="profile_wrapper">
          <div className="profile_container">
            <div className="profile">
              <Avatar className="profile_pic" src={profile.profilePic} />
              <div className="profile_info">
                <h3>{profile.fullName} </h3>
                <LocationOnIcon color="secondary" />{" "}
                <h5 style={{ display: "inline" }}>{profile.grad}</h5>
              </div>
              <div className="profile_contact">
                <ContactTutor />
              </div>
            </div>
            <div className="profile_about">
              <div className="profile_aboutme">
                <h1>Кратка биографија</h1>
                <div dangerouslySetInnerHTML={{ __html: profile.bio }}></div>
              </div>
              <div className="profile_education">
                <h1>Образование</h1>
                <span>{profile.obrazovanie}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
