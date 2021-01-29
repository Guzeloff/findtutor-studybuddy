import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../store/redux";

function Register() {
  //store
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.userLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profesor, setProfesor] = useState(false);
  const [hideLabel, sethideLabel] = useState("");
  const [formName, setformName] = useState("Регистирај се");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState("block");

  const history = useHistory();

  useEffect(() => {
    if (userLogged != null) {
      setLoggedIn("none");
    } else {
      setLoggedIn("block");
      setformName("Регистирај се");
      sethideLabel("");
    }
  }, [userLogged]);

  const register = (e) => {
    e.preventDefault();
    // if (!profesor) {
    //   auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then((auth) => {
    //       let user = {
    //         userid: auth.user.uid,
    //         email: auth.user.email,
    //         tutor: profesor,
    //         username: email.substring(0, email.lastIndexOf("@")),
    //       };
    //       dispatch({
    //         type: "REGISTER",
    //         payload: user,
    //       });
    //       history.push("/");
    //     })
    //     .catch((e) => setError(e.message));
    // } else {
    history.push({
      pathname: "/ProfileRegister",
      state: {
        email: email,
        password: password,
        profesor: profesor,
      },
    });
  };

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        let user = {
          userid: auth.user.uid,
          email: auth.user.email,
          username: email.substring(0, email.lastIndexOf("@")),
        };
        dispatch({
          type: "LOGIN",
          payload: user,
        });
        db.collection("Profile")
          .doc(auth.user.uid)
          .get()
          .then((snapshot) => {
            dispatch({
              type: "CREATED_PROFILE",
              payload: snapshot.data(),
            });
          });
        history.push("/");
      })
      .catch((e) => setError(e.message));
  };

  const showLogin = (e) => {
    sethideLabel("none");
    setformName("Најави се");
  };

  return (
    <div>
      <section className="ftco-section ftco-no-pb ftco-no-pt">
        <div className="container">
          <div className="row">
            <div className="col-md-7" />
            <div className="col-md-5 order-md-last">
              <div
                className="login-wrap p-4 p-md-5"
                style={{ display: `${loggedIn}` }}
              >
                <h3 className="mb-4">{formName}</h3>
                <form
                  action="#"
                  className="signup-form"
                  data-toggle="validator"
                >
                  <div className="form-group">
                    <label className="label" htmlFor="email" required>
                      е-маил адреса
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="password" required>
                      лозинка
                    </label>
                    <input
                      id="password-field"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ display: `${hideLabel}` }}
                  >
                    <span style={{ paddingRight: "10px" }}>
                      Дали се пријавувате како тутор?
                    </span>
                    <input
                      checked={profesor}
                      onChange={(event) => setProfesor(event.target.checked)}
                      type="checkbox"
                    ></input>
                    <span style={{ marginLeft: "5px" }}>Да</span>
                  </div>
                  <span style={{ color: "red", display: `${hideLabel}` }}>
                    {error}
                  </span>
                  <div className="form-group d-flex justify-content-center mt-4">
                    {formName === "Најави се" ? (
                      <div className="loginWrapper">
                        <button
                          onClick={login}
                          className="btn btn-primary submit"
                        >
                          <span className="fa fa-paper-plane" />
                          {formName}
                        </button>
                        <div className="errorlogin" style={{ color: "red" }}>
                          {error}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={register}
                        className="btn btn-primary submit"
                      >
                        <span className="fa fa-paper-plane" />
                        {formName}
                      </button>
                    )}
                  </div>
                </form>
                <p style={{ display: `${hideLabel}` }} className="text-center">
                  Дали имате профил?{" "}
                  <button
                    type="submit"
                    onClick={showLogin}
                    className="btn btn-link"
                  >
                    <span
                      className="fa fa-sign-in"
                      style={{ paddingRight: "5px" }}
                    />
                    Логирај се
                  </button>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
