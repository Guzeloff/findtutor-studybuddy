import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import moment from "moment";

import "./Comments.css";
//mui stuff
import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Typography from "@material-ui/core/Typography";

function Comments({ questionId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.comments);

  const getComments = async (questionId) => {
    let qna = {};
    let allcomments = [];
    const comments = await db
      .collection("Answers")
      .orderBy("createdAt", "desc")
      .where("questionId", "==", questionId)
      .get();
    let promises = comments.docs.map(async (comment) => {
      let answerdby = await db
        .collection("Profile")
        .where("userid", "==", comment.data().profileid)
        .get();
      answerdby.forEach((user) => {
        let userprofile = {
          profilePic: user.data().profilePic,
          username: user.data().username,
          fullName: user.data().fullName,
        };
        qna = { ...userprofile, ...comment.data() };
      });
      allcomments.push(qna);
    });
    Promise.all(promises)
      .then(() => {
        dispatch({
          type: "GET_COMMENTS",
          payload: allcomments,
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments(questionId);

    // db.collection("Answers")
    //   .orderBy("createdAt", "desc")
    //   .where("questionId", "==", questionId)
    //   .get()
    //   .then((snapshot) => {
    //     let promises = snapshot.docs.map((snap) => {
    //       db.collection("Profile")
    //         .where("userid", "==", snap.data().profileid)
    //         .get()
    //         .then((profile) => {
    //           profile.forEach((prof) => {
    //             let userprof = {
    //               profilePic: prof.data().profilePic,
    //               username: prof.data().username,
    //               fullName: prof.data().fullName,
    //             };
    //             QnA = { ...userprof, ...snap.data() };
    //           });
    //           comments.push(QnA);
    //         });
    //       return comments;
    //     });
    //     Promise.all(promises).then((comments) => {
    //       console.log(comments);
    //       dispatch({
    //         type: "GET_COMMENTS",
    //         payload: comments,
    //       });
    //     });
    //   });
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {comments.length == 0 ? (
            <Alert severity="info">Нема коментари во врска со прашањето</Alert>
          ) : (
            <Grid container>
              {comments.map((comment) => (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={2}>
                      <img
                        src={comment.profilePic}
                        alt="commentUser"
                        className="commentImage"
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <div>
                        <Typography
                          display="block"
                          variant="h5"
                          component={Link}
                          to={`/profile/${comment.username}`}
                          color="primary"
                        >
                          {comment.fullName}
                        </Typography>
                      </div>
                      <div className="commentDetails">
                        <Typography
                          variant="subtitle2"
                          component={Link}
                          to={`/profile/${comment.username}`}
                          color="textSecondary"
                        >
                          <AlternateEmailIcon
                            fontSize="small"
                            variant="subtitle2"
                            color="secondary"
                          />{" "}
                          {comment.username}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: "lightgrey" }}
                          display="block"
                        >
                          {moment(comment.createdAt.toDate()).fromNow()}
                        </Typography>

                        <Typography variant="body1" className="comment">
                          {comment.comment}
                        </Typography>
                      </div>
                      <hr />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}

          <hr />
        </>
      )}
    </>
  );
}

export default Comments;
