import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db, storage, firebase } from "../firebase";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ReactQuill from "react-quill";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import LinearProgress from "@material-ui/core/LinearProgress";
import "react-quill/dist/quill.snow.css";

import "./ProfileRegister.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ProfileRegister() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [adresa, setAdresa] = useState("");
  const [grad, setGrad] = useState("");
  const [telbroj, setTelBroj] = useState("");
  const [bio, setBio] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [tutorSubject, setTutorsubject] = useState([]);
  const [categories, setCategories] = useState({});
  const [obrazovanie, setObrazovanie] = useState("");
  const [submit, setSubmit] = useState(false);
  const [progressbar, setProgressBar] = useState("none");

  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmit(true);

    auth
      .createUserWithEmailAndPassword(
        location.state.email,
        location.state.password
      )
      .then((auth) => {
        let newUser = {
          userid: auth.user.uid,
          email: auth.user.email,
          tutor: location.state.profesor,
          username: location.state.email.substring(
            0,
            location.state.email.lastIndexOf("@")
          ),
        };
        dispatch({
          type: "REGISTER",
          payload: newUser,
        });
        if (location.state.profesor) {
          let userProfile = {
            userid: newUser.userid,
            email: newUser.email,
            fullName: fullName,
            adresa: adresa,
            grad: grad,
            telbroj: telbroj,
            subjects: tutorSubject,
            profilePic: imgUrl,
            bio: bio,
            username: newUser.username,
            hearts: 0,
            obrazovanie: obrazovanie,
            profesor: location.state.profesor,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          };

          db.collection("Profile")
            .doc(newUser.userid)
            .set({
              userid: newUser.userid,
              email: newUser.email,
              fullName: fullName,
              adresa: adresa,
              grad: grad,
              telbroj: telbroj,
              subjects: tutorSubject,
              profilePic: imgUrl,
              bio: bio,
              username: newUser.username,
              hearts: 0,
              obrazovanie: obrazovanie,
              profesor: location.state.profesor,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              dispatch({
                type: "CREATED_PROFILE",
                payload: userProfile,
              });
              setSubmit(false);
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          let userProfile = {
            userid: newUser.userid,
            email: newUser.email,
            fullName: fullName,
            adresa: adresa,
            grad: grad,
            telbroj: telbroj,
            profilePic: imgUrl,
            username: newUser.username,
            obrazovanie: obrazovanie,
            profesor: location.state.profesor,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          };
          db.collection("Profile")
            .doc(newUser.userid)
            .set({
              userid: newUser.userid,
              email: newUser.email,
              fullName: fullName,
              adresa: adresa,
              grad: grad,
              telbroj: telbroj,
              profilePic: imgUrl,
              username: newUser.username,
              obrazovanie: obrazovanie,
              profesor: location.state.profesor,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              dispatch({
                type: "CREATED_PROFILE",
                payload: userProfile,
              });
              setSubmit(false);
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  const handleChange = (event) => {
    setTutorsubject(event.target.value);
  };
  const uploadPic = async (e) => {
    setSubmit(true);
    setProgressBar("block");
    const file = e.target.files[0];
    const uploadTask = storage.ref(`TutorsProfilePictures/`);
    const fileRef = uploadTask.child(file.name);
    await fileRef.put(file);
    setImgUrl(await fileRef.getDownloadURL());
    setProgressBar("none");
    setSubmit(false);
  };

  return (
    <div>
      <div>
        <section className="ftco-section ftco-no-pb ftco-no-pt">
          <div className="container">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8" id="profileWrap">
                <div
                  className="login-wrap p-4 p-md-5"
                  style={{ margin: "0px auto" }}
                >
                  <h3 className="mb-4">Креирајте го вашиот профил</h3>
                  <form
                    className="signup-form"
                    data-toggle="validator"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label className="label" htmlFor="name" required={true}>
                        Име Презиме
                      </label>
                      <input
                        required
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Име Презиме"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="address" required>
                        Aдреса на живеење
                      </label>
                      <input
                        required
                        type="text"
                        value={adresa}
                        onChange={(event) => setAdresa(event.target.value)}
                        className="form-control"
                        placeholder="Улица број"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="city" required>
                        Град
                      </label>
                      <input
                        required
                        id="password-field"
                        value={grad}
                        onChange={(event) => setGrad(event.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Град"
                      />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="phone" required>
                        Тел број
                      </label>
                      <input
                        required
                        type="number"
                        value={telbroj}
                        onChange={(event) => setTelBroj(event.target.value)}
                        className="form-control"
                        placeholder="07*******"
                      />
                    </div>
                    {location.state.profesor && (
                      <>
                        <div className="form-group">
                          <label className="label" htmlFor="school" required>
                            Образование/Академија
                          </label>
                          <input
                            type="text"
                            value={obrazovanie}
                            onChange={(event) =>
                              setObrazovanie(event.target.value)
                            }
                            className="form-control"
                            placeholder="име на образовна институција"
                          />
                        </div>
                        <div className="form-group">
                          <FormControl required className={classes.formControl}>
                            <InputLabel id="demo-mutiple-checkbox-label">
                              Област во која ќе вршите предавања
                            </InputLabel>
                            <Select
                              labelId="demo-mutiple-checkbox-label"
                              id="demo-mutiple-checkbox"
                              value={tutorSubject}
                              renderValue={(selected) =>
                                tutorSubject.map((item) => item).join(", ")
                              }
                              multiple
                              onChange={handleChange}
                              input={<Input />}
                              MenuProps={MenuProps}
                            >
                              {subjects.map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                  <Checkbox
                                    checked={tutorSubject.indexOf(subject) > -1}
                                  />
                                  <ListItemText
                                    primary={subject}
                                    className={classes.listItem}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </>
                    )}
                    <div className="form-group" style={{ paddingTop: "20px" }}>
                      <label
                        style={{ marginTop: "12px" }}
                        className="label"
                        htmlFor="image"
                        required
                      >
                        {" "}
                        Слика{" "}
                      </label>
                      <input
                        required
                        type="file"
                        onChange={uploadPic}
                        className="form-control"
                      />
                      <LinearProgress
                        thickness="1.4"
                        style={{ display: `${progressbar}` }}
                      />
                    </div>
                    {location.state.profesor && (
                      <div className="form-group">
                        <label className="label" htmlFor="bio" required>
                          Кратка биографија
                        </label>
                        <ReactQuill
                          placeholder="Опишете се себе си"
                          required
                          value={bio}
                          onChange={(val) => setBio(val)}
                        />
                      </div>
                    )}
                    <button
                      disabled={submit}
                      type="submit"
                      id="createProfile"
                      className="btn btn-primary submit"
                    >
                      <span
                        className="fa fa-paper-plane"
                        style={{ padding: "10px" }}
                      />
                      Креирај
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileRegister;
