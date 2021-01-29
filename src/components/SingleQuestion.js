import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SingleQuestion.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from "moment";
//router
import { Link } from "react-router-dom";

//material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import DeleteQuestion from "./DeleteQuestion";
import PostComment from "./PostComment";

function SingleQuestion({ question, profile }) {
  const user = useSelector((state) => state.user);

  dayjs.extend(relativeTime);

  return (
    <Card className="card">
      <CardMedia
        style={{ height: "120px", borderRadius: "50%" }}
        className="cardImg"
        image={question.profilePic}
        title="Profile picture"
      />
      <CardContent className="cardContent">
        <Typography
          display="block"
          variant="h5"
          component={Link}
          to={`/profile/${question.username}`}
          color="primary"
        >
          {question.fullName}
        </Typography>
        <Typography
          variant="subtitle2"
          component={Link}
          to={`/profile/${question.username}`}
          color="textSecondary"
        >
          <AlternateEmailIcon
            fontSize="small"
            variant="subtitle2"
            color="secondary"
          />{" "}
          {question.username}
        </Typography>
        <Typography
          variant="body1"
          style={{ color: "lightgrey" }}
          display="block"
        >
          {moment(question.createdAt.toDate()).fromNow()}
        </Typography>
        <hr />
        <Typography variant="h5">{question.question}</Typography>
        <Typography variant="body1">{question.questionBody}</Typography>
        <div className="buttonWrap">
          <PostComment questionId={question.questionId} />
          {user.userid === question.userid && (
            <DeleteQuestion questionId={question.questionId} />
          )}
        </div>
        <Typography className="questionCategory">
          категорија : {question.questionCategory}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SingleQuestion;
