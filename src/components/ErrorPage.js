import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <span style={{ backgroundImage: 'url("images/emoji.png")' }}></span>
        </div>
        <h2>Oops! Страницата не е пронајдена</h2>
        <p>
          За жал, страницата што ја барате не постои , e отстранета или е
          привремено недостапно
        </p>
        <Link to="/">Назад кон почетна</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
