import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link, useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

function Tutori() {
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState();
  const [allProfiles, setAllProfiles] = useState();
  const [value, setValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    db.collection("Subjects").onSnapshot((snapshot) => {
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
    db.collection("Profile")
      .where("profesor", "==", true)
      .onSnapshot((snapshot) => {
        setProfiles(snapshot.docs.map((doc) => doc.data()).slice(0, 20));
        setAllProfiles(snapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      });
  }, []);

  const userProfile = (userid, username) => {
    history.push({
      pathname: `/Profile/${username}`,
      state: { user: userid },
    });
  };

  const filterTutors = (e) => {
    setValue(e.target.value);
    setProfiles(
      allProfiles.filter((profile) => profile.subjects.includes(e.target.value))
    );
  };

  return (
    <div>
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: 'url("images/bg_2.jpg")' }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end justify-content-center">
            <div className="col-md-9  pb-5 text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">
                    Почетна <i className="fa fa-chevron-right"></i>
                  </Link>
                </span>{" "}
                <span>
                  Најди тутор <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Листа на тутори</h1>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <section className="ftco-section bg-light">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 sidebar">
                  <div className="sidebar-box bg-white">
                    <form className="search-form">
                      <div className="form-group">
                        <span className="icon fa fa-search"></span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Пребарај..."
                        />
                      </div>
                    </form>
                  </div>
                  <div className="sidebar-box bg-white p-4">
                    <h3 className="heading-sidebar">Предмети</h3>
                    <form
                      action="#"
                      className="browse-form"
                      style={{ textAlign: "left" }}
                    >
                      {subjects.map((sub, i) => (
                        <>
                          <label>
                            <input
                              type="radio"
                              onChange={filterTutors}
                              key={i}
                              value={sub}
                              checked={value === sub}
                            />
                            {sub}
                          </label>
                          <br />
                        </>
                      ))}
                    </form>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    {profiles.map((profile, i) => (
                      <div
                        key={i}
                        className="col-md-6 col-lg-4 col-sm-6  d-flex align-items-stretch"
                      >
                        <div className="staff">
                          <div className="img-wrap d-flex align-items-stretch">
                            <div
                              className="img align-self-stretch"
                              style={{
                                backgroundImage: `url(${profile.profilePic})`,
                              }}
                            ></div>
                          </div>
                          <div className="text pt-3">
                            <h3 style={{ marginBottom: "10px" }}>
                              {profile.fullName}
                            </h3>
                            {profile.subjects.map((subject) => (
                              <div
                                className="subject_wrapper"
                                style={{
                                  marginRight: "5px",
                                  backgroundColor: "#e2e2e28c",
                                  display: "inline-flex",
                                  borderRadius: "20px",
                                  height: "25px",
                                }}
                              >
                                <span
                                  className="position mb-2"
                                  style={{
                                    paddingLeft: "6px",
                                    paddingRight: "6px",
                                  }}
                                >
                                  {subject}
                                  <br />
                                </span>
                              </div>
                            ))}

                            <div
                              className="faded"
                              style={{ marginTop: "20px" }}
                            >
                              <p>
                                Lorem ipsu em ipsumem ipsumem ipsumem ipsumem
                                ipsumm
                              </p>
                              <div className="visitProfile">
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() =>
                                    userProfile(
                                      profile.userid,
                                      profile.username
                                    )
                                  }
                                  style={{
                                    fontSize: "10px",
                                    color: "#fff    ",
                                  }}
                                >
                                  ПРОФИЛ
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Tutori;
