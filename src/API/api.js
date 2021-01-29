import { db } from "../firebase";

export const getQuestions = async () => {
  let questions = [];

  await db
    .collection("Questions")
    .get()
    .then((snapshot) => {
      questions = snapshot.docs.map((doc) => doc.data());
      return questions;
    })
    .catch((error) => console.log(error));
};

export const getAnswers = async () => {
  let answers = [];

  await db
    .collection("Answers")
    .get()
    .then((snapshot) => {
      return (answers = snapshot.docs.map((doc) => doc.data()));
    })
    .catch((error) => console.log(error));
};

export const getQA = async () => {
  const dispatch = useDispatch();
  let singleQuestion = {};
  let questionMerge = {};
  db.collection("Questions")
    .get()
    .then((snapshot) => {
      snapshot.forEach((snap) => {
        db.collection("Profile")
          .where("userid", "==", snap.data().userquestion)
          .get()
          .then((profile) => {
            profile.forEach((prof) => {
              singleQuestion = {
                profilePic: prof.data().profilePic,
                username: prof.data().username,
              };
              questionMerge = { ...singleQuestion, ...snap.data() };
            });
          });
      });
    })
    .then(() => {
      dispatch({
        type: "GET_QUESTIONS",
        payload: questionsNew,
      });
    });
};
