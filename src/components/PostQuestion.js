import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db, firebase } from "../firebase";
import "./PostQuestion.css";
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

function PostQuestion() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [question, setQuestion] = useState("");
  const [decription, setDescription] = useState("");
  const [categories, setCategories] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection("Subjects")
      .get()
      .then((snapshot) => {
        setCategories(
          snapshot.docs.map((doc) =>
            doc
              .data()
              .Categories.map((cat) =>
                setSubjects((oldArray) => [...oldArray, cat])
              )
          )
        );
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const addNewQuestion = db.collection("Questions").doc();
    addNewQuestion
      .set({
        question: question,
        questionBody: decription,
        questionCategory: category,
        userid: user.userid,
        username: user.username,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        dispatch({
          type: "POSTED_QUESTION",
          payload: {
            questionId: addNewQuestion.id,
            profilePic: profile.profilePic,
            username: profile.username,
            question: question,
            questionBody: decription,
            questionCategory: category,
            userid: user.userid,
            username: user.username,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          },
        });
        setLoading(false);
        setOpen(false);
      });

    setQuestion("");
    setCategory("");
    setDescription("");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
        size="small"
        variant="contained"
        color="secondary"
        startIcon={<AddBoxIcon />}
      >
        Постави прашање
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className="askQuestion"
      >
        <Button tip="close" onClick={handleClose} className="closeButton">
          <CloseIcon />
        </Button>
        <DialogTitle>Постирај прашање</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="Prasanje"
              type="text"
              label="Прашање"
              multiline
              placeholder="Вашето прашање е?"
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <TextField
              fullWidth
              name="Objasnuvanje"
              type="text"
              label="Објаснување"
              multiline
              rows="3"
              placeholder="Објаснување за прашањето"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">
                Категорија на прашањето
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              style={{ marginTop: "0.5rem" }}
              size="small"
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Постирај
              {loading && <CircularProgress size={30} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostQuestion;
