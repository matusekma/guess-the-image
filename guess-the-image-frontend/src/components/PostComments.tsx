import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { red } from "@material-ui/core/colors";
import {
  CardContent,
  Card,
  CardHeader,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { ChangeHistory, PlayArrow } from "@material-ui/icons";

import Comment, { CommentStatus } from "../DTO/post/Comment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "70%",
    },
    action: {
      alignSelf: "center",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundSize: "contain",
    },
    avatar: {
      backgroundColor: red[500],
    },
    inline: {
      display: "inline",
    },
  })
);

interface Props {
  comments: Comment[];
  setCommentStatus: (commentId: number, status: CommentStatus) => void;
}

function getStatusIcon(status: CommentStatus) {
  switch (status) {
    case CommentStatus.CORRECT:
      return (
        <IconButton style={{ color: "green" }}>
          <PlayArrow style={{ transform: "rotate(-90deg)" }} fontSize="large" />
        </IconButton>
      );
    case CommentStatus.INCORRECT:
      return (
        <IconButton style={{ color: "red" }}>
          <ChangeHistory fontSize="large" />
        </IconButton>
      );
    default:
      return undefined;
  }
}

const PostComments = ({ comments, setCommentStatus }: Props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {comments.length > 0
        ? comments.map((comment) => (
            <Card className={clsx(classes.root, "post-details mb-2")}>
              <CardHeader
                classes={{ action: classes.action }}
                avatar={
                  <Avatar aria-label="User" className={classes.avatar}>
                    {comment.user.username[0]}
                  </Avatar>
                }
                title={comment.user.username}
                subheader={new Date(comment.createdAt).toLocaleString("hu-hu")}
                action={
                  <div
                    onClick={() =>
                      setCommentStatus(
                        comment.id,
                        comment.status === CommentStatus.CORRECT
                          ? CommentStatus.INCORRECT
                          : CommentStatus.CORRECT
                      )
                    }
                  >
                    {getStatusIcon(comment.status)}
                  </div>
                }
              />
              <Divider />
              <CardContent>
                <div className="d-flex align-items-center">
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.text}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
    </React.Fragment>
  );
};

export default PostComments;
