import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import CoursesNav from "./CoursesNav";
import Register from "./Register";
import Footer from "./Footer";
import PopUpAlerts from "./PopUpAlerts";

function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <div
        className="hero-wrap js-fullheight"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row no-gutters slider-text js-fullheight align-items-center"
            data-scrollax-parent="true"
          >
            <div className="col-md-7" style={{ marginTop: "40%" }}>
              <span className="subheading">Добредојдовте на StudyBud</span>
              <h1 className="mb-4">
                Онлајн платформа за пронаоѓање на вистинскиот ТУТОР
              </h1>
              <p className="mb-0">
                <Link to="/tutori" className="btn btn-primary">
                  ПРОНАЈДИ ТУТОР
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Register />
      <CoursesNav />
      <div>
        <section className="ftco-section ftco-about img">
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-12 about-intro">
                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="d-flex about-wrap">
                      <div
                        className="img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: 'url("images/about-1.jpg")' }}
                      ></div>
                      <div
                        className="img-2 d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: 'url("images/about.jpg")' }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-md-6 pl-md-5 py-5">
                    <div className="row justify-content-start pb-3">
                      <div className="col-md-12 heading-section">
                        <span className="subheading">
                          Подобрите ги вашите вештини
                        </span>
                        <h2 className="mb-4">
                          Добијте брзо решение за вашите образовни проблеми
                        </h2>
                        <p>
                          Дали имате проблеми со домашните задачи по математика
                          или тешкотии при подготвувањето на тезата по физика?
                          Дали ви треба брзо и прецизно решение? Сè што треба да
                          направите е да се регистирате и да го побарате тутор
                          кој е најсоодветен за вашиот проблем
                        </p>
                        <p>
                          <Link to="/tutori" className="btn btn-primary">
                            Побарајте го вашиот тутор
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section className="ftco-section ftco-about img">
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-12 about-intro">
                <div className="row">
                  <div className="col-md-6 pl-md-5 py-5">
                    <div className="row justify-content-start pb-3">
                      <div className="col-md-12 heading-section">
                        <span className="subheading">
                          Учењето од далечина е одлично
                        </span>
                        <h2 className="mb-4">Зошто да учите онлајн?</h2>
                        <ul style={{ textAlign: "left" }}>
                          <li>
                            заштеда на пари и време со отстранување на потребата
                            за патување до дома на туторот
                          </li>
                          <li>
                            избор на искусни професори во различни области
                          </li>
                          <li>
                            лесен и брз начин да пребарувате и да најдете
                            квалитетен учител за одредена тема
                          </li>
                        </ul>
                        <Link to="/questions" className="btn btn-primary">
                          Бесплатни прашања до вашиот тутор
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="d-flex about-wrap">
                      <div
                        className="img d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: 'url("images/bg_2.jpg")' }}
                      ></div>
                      <div
                        className="img-2 d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: 'url("images/image_2.jpg")' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
