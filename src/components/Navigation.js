import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import MenuIcon from "@material-ui/icons/Menu";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const history = useHistory();

  const userProfile = (userid, username) => {
    history.push({
      pathname: `/Profile/${username}`,
      state: { user: userid },
    });
  };

  const logout = () => {
    auth.signOut().then(() => {
      dispatch({
        type: "LOGOUT",
      });
    });
    history.push("/");
  };

  return (
    <div>
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
          id="ftco-navbar"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              <span>Study</span>Bud
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#ftco-nav"
              aria-controls="ftco-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="oi oi-menu" /> <MenuIcon />
            </button>
            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    <HomeIcon /> Почетна
                  </Link>
                </li>
                {/* <li className="nav-item"><a href="about.html" className="nav-link">About</a></li> */}
                {/* <li className="nav-item"><a href="course.html" className="nav-link">Курсеви</a></li> */}
                <li className="nav-item">
                  <Link to="/tutori" className="nav-link">
                    <AssignmentIndIcon />
                    Најди тутор
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/questions"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    <QuestionAnswerIcon />
                    Прашај тутор
                  </Link>
                </li>

                {user != null && profile != null && (
                  <li className="nav-item">
                    <a
                      onClick={() => userProfile(user.userid, user.username)}
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      <FaceIcon />
                      Профил
                    </a>
                  </li>
                )}

                {user != null && (
                  <li className="nav-item">
                    <a
                      onClick={logout}
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      <ExitToAppIcon />
                      Одјави се
                    </a>
                  </li>
                )}

                {/* <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
