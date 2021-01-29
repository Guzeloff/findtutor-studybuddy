import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import PopUpAlerts from "./PopUpAlerts";
import "./Questions.css";

//Components
import "./SingleQuestion";

//material ui
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import SingleQuestion from "./SingleQuestion";
import UserProfile from "./UserProfile";
import { Menu, Typography } from "@material-ui/core";

function Questions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filterValue, setfilterValue] = useState("");
  const [category, setCategory] = useState("");
  const questions = useSelector((state) => state.questions);
  const profile = useSelector((state) => state.profile);
  const [categories, setCategories] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singleQuest, setSingleQuest] = useState({});

  useEffect(() => {
    let questionsNew = [];
    let QnA = {};
    let qustlength = 0;
    let questionAnswers = [];
    db.collection("Questions")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setLoading(false);
        } else {
          snapshot.forEach((snap) => {
            //za sekoje prasanje
            let questionId = snap.id;
            // db.collection("Answers")
            //   .orderBy("createdAt", "desc")
            //   .where("questionId", "==", questionId)
            //   .get()
            //   .then((answers) => {
            //     answers.forEach((answer) => {
            //       questionAnswers.push(answer.data());
            //     });
            //   })
            //   .catch((e) => console.log(e.message));
            db.collection("Profile")
              .where("userid", "==", snap.data().userid) //daj mi koj go postiral
              .get()
              .then((snaprofiles) => {
                qustlength++;
                snaprofiles.forEach((s) => {
                  //i za sekoj profil podatoci
                  let questPostedProfile = {
                    questionId: questionId,
                    profilePic: s.data().profilePic,
                    username: s.data().username,
                    fullName: s.data().fullName,
                  };
                  questionAnswers = [];
                  QnA = { ...questPostedProfile, ...snap.data() }; //snapdata - koj question qujestposted-koj go postirla
                });
                questionsNew.push(QnA);
              })
              .then(() => {
                if (qustlength == snapshot.docs.length) {
                  dispatch({
                    type: "GET_QUESTIONS",
                    payload: questionsNew,
                  });
                  setLoading(false);
                }
              });
          });
        }
      });

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
    dispatch({
      type: "GET_QUESTIONS",
      payload: questionsNew,
    });
  }, []);

  const filterQuestions = (e) => {
    dispatch({
      type: "FILTER_QUESTIONS",
      payload: e.target.value,
    });
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {!profile ? (
            <PopUpAlerts alert="За да поставите прашање мора да бидете" />
          ) : (
            <Grid
              justify="space-evenly"
              container
              spacing={12}
              style={{ paddingTop: "140px" }}
            >
              <Grid item md={3} sm={8} xs={8}>
                <UserProfile />
                <FormControl
                  fullWidth
                  maxWidth="sm"
                  style={{ marginBottom: "1.2rem" }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Категорија
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={filterQuestions}
                  >
                    <MenuItem value="Сите">Сите</MenuItem>
                    <hr />
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {questions.length == 0 ? (
                <Grid item md={8} sm={12} xs={12}>
                  <Alert severity="info">Нема поставени прашања</Alert>
                </Grid>
              ) : (
                <Grid item md={8} sm={12} xs={12}>
                  {questions.map((question) => (
                    <SingleQuestion
                      key={question.questionId}
                      question={question}
                      profile={profile}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default Questions;
