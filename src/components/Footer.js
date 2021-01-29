import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div>
      <footer className="ftco-footer ftco-no-pt">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md pt-5">
              <div className="ftco-footer-widget pt-md-5 mb-4">
                <h2 className="ftco-heading-2">За нас</h2>
                <p>
                  StuddBud е онлајн едукативна платформа што овозможува примање
                  и пренесување на знаење меѓу студенти и предавачи
                </p>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
                  <li className="">
                    <a href="#">
                      <span className="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="fa fa-facebook"></span>
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="fa fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md pt-5">
              <div className="ftco-footer-widget pt-md-5 mb-4">
                <h2 className="ftco-heading-2">Помош?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li>
                      <span className="icon fa fa-map-marker"></span>
                      <span className="text">
                        85 Булевард АД , Македонија , Струмица,
                      </span>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon fa fa-phone"></span>
                        <span className="text">+78 999 555</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon fa fa-paper-plane"></span>
                        <span className="text">info@studybud.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
