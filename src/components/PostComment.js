import React, { useState, useEffect } from "react";
import { db, firebase } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import "./PostComment.css";
//MUI STUFF
import {
  CircularProgress,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Button from "@material-ui/core/Button";
import SingleQuestion from "./SingleQuestion";

import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import CloseIcon from "@material-ui/icons/Close";
import Comments from "./Comments";

function PostComment({ questionId, answers }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [questionIDD, setquestionID] = useState(questionId);
  const questions = useSelector((state) => state.questions);
  const [singleQuestion, setsingleQuestion] = useState(answers);
  const [open, setOpen] = useState(false);
  const comments = useSelector((state) => state.comments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let index = questions.findIndex(
      (question) => question.questionId === questionIDD
    );
    setLoading(true);

    let newComment = {
      comment: comment,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      questionId: questionIDD,
      profileid: profile.userid,
      profilePic: profile.profilePic,
      username: profile.username,
      fullName: profile.fullName,
    };
    const addNewAnswer = db.collection("Answers").doc();
    await addNewAnswer.set(newComment).then(() => {
      dispatch({
        type: "POST_COMMENT",
        payload: {
          comment: comment,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          questionId: questionIDD,
          profileid: profile.userid,
          profilePic: profile.profilePic,
          username: profile.username,
          fullName: profile.fullName,
        },
      });
      console.log(newComment);
      setComment("");
    });

    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        className="commentButton"
        variant="outlined"
        size="small"
        startIcon={<ChatBubbleOutlineIcon />}
      >
        Коментар {`(${comments.length})`}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <Button tip="close" onClick={handleClose} className="closeButton">
          <CloseIcon />
        </Button>
        <DialogTitle className="dialog-title">
          Дискусија во врска со прашањето
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="Коментар"
              type="text"
              label="Коментар"
              multiline
              rows="3"
              value={comment}
              placeholder="Додадете коментар"
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <Button
              className="addcomment-button"
              type="submit"
              size="small"
              variant="contained"
              color="secondary"
              disabled={loading}
              startIcon={<AddToPhotosIcon />}
            >
              Коментирај
              {loading && <CircularProgress size={30} />}
            </Button>
          </form>
          <hr />
          <Comments questionId={questionId} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostComment;
