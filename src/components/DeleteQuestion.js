import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import "./DeleteQuestion.css";

// MUI Stuff
import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";

function DeleteQuestion({ questionId }) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteQuestion = async (questionId) => {
    let index = questions.findIndex(
      (question) => question.questionId === questionId
    );

    const deletequs = await db.collection("Questions").doc(questionId).delete();
    const deleteanswers = db
      .collection("Answers")
      .where("questionId", "==", questionId);
    deleteanswers.get().then((snapshot) => {
      snapshot.forEach((snap) => {
        snap.ref.delete();
      });
    });

    dispatch({
      type: "DELETE_QUESTION",
      payload: index,
    });

    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} color="secondary" className="deleteIcon">
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className="deleteQuestion"
      >
        <DialogTitle>
          Дали сте сигурни дека сакате да го избришете прашањето
        </DialogTitle>
        <Button color="secondary" onClick={handleClose} variant="outlined">
          Не
        </Button>
        <Button
          onClick={() => {
            deleteQuestion(questionId);
          }}
          color="primary"
          variant="outlined"
        >
          Да
        </Button>
      </Dialog>
    </div>
  );
}

export default DeleteQuestion;
