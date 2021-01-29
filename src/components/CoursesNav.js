import React, { useState, useEffect } from "react";
import CourseNavSingle from "./CourseNavSingle";

import { db } from "../firebase";

function CoursesNav() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    db.collection("Subjects")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let sub = {};
          sub = {
            categoryName: doc.data().categoryName,
            image: doc.data().image,
          };
          setSubjects((oldArray) => [...oldArray, sub]);
        });
      });
  }, []);

  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center">
              <span className="subheading">Почни со учење уште денес</span>
              <h2 className="mb-4">Прелистај ги категориите</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {subjects.map((subject, index) => {
              return (
                <CourseNavSingle
                  key={index}
                  subject={subject.categoryName}
                  image={subject.image}
                />
              );
            })}
            <div className="col-md-12 text-center mt-5">
              <a className="btn btn-secondary">Сите Категории</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoursesNav;
