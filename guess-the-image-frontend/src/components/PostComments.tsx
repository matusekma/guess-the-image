import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";
import {
  CardContent,
  Card,
  CardHeader,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import { ChangeHistory, PlayArrow } from "@material-ui/icons";

import Comment, { CommentStatus } from "../DTO/post/Comment";
import { RootState } from "../reducers/rootReducer";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface Props {
  postCreatorId: number;
  comments: Comment[];
  setCommentStatus: (commentId: number, status: CommentStatus) => void;
}

function getStatusIcon(
  status: CommentStatus,
  statusSetter: () => void,
  canChangeStatus: boolean
) {
  let icon;
  switch (status) {
    case CommentStatus.CORRECT:
      icon = (
        <PlayArrow
          style={{
            transform: "rotate(-90deg)",
            color: "green",
            fontSize: "2.4rem",
          }}
        />
      );
      if (canChangeStatus) {
        return (
          <IconButton title="Helytelennek jelölés" onClick={statusSetter}>
            {icon}
          </IconButton>
        );
      }
      return (
        <Tooltip title="Helyes" aria-label="helyes">
          {icon}
        </Tooltip>
      );

    case CommentStatus.INCORRECT:
      icon = <ChangeHistory style={{ color: "red", fontSize: "2rem" }} />;
      if (canChangeStatus) {
        return (
          <IconButton title="Helyesnek jelölés" onClick={statusSetter}>
            {icon}
          </IconButton>
        );
      }
      return (
        <Tooltip title="Helytelen" aria-label="helytelen">
          {icon}
        </Tooltip>
      );
    default:
      return undefined;
  }
}

const PostComments = ({ postCreatorId, comments, setCommentStatus }: Props) => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <React.Fragment>
      {comments.length > 0
        ? comments.map((comment) => (
            <Card key={comment.id} className="w-100 mb-2">
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
                  <div>
                    {getStatusIcon(
                      comment.status,
                      () =>
                        setCommentStatus(
                          comment.id,
                          comment.status === CommentStatus.CORRECT
                            ? CommentStatus.INCORRECT
                            : CommentStatus.CORRECT
                        ),
                      !!user && postCreatorId === user.id
                    )}
                  </div>
                }
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                  {comment.text}
                </Typography>
              </CardContent>
            </Card>
          ))
        : null}
    </React.Fragment>
  );
};

export default PostComments;
