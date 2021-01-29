const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.getQuestions = functions.https.onRequest((req, res) => {
  firebaseApp
    .firestore()
    .collection("Questions")
    .get()
    .then((data) => {
      let questions = [];
      data.forEach((doc) => {
        questions.push(doc.data());
      });
      return res.json(questions);
    })
    .catch((err) => console.log(err));
});
