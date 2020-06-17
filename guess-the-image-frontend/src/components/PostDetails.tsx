import React, { Suspense } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

import logo from "../images/logo.png";

import Post from "../DTO/post/Post";
import {
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { CommentStatus } from "../DTO/post/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const LazyPostImage = React.lazy(() => import("./LazyPostImage"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "70%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundSize: "contain",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
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
  post: Post;
}

function getStatusIcon(status: CommentStatus) {
  switch (status) {
    case CommentStatus.CORRECT:
      return <FontAwesomeIcon icon={faCheck} />;
    case CommentStatus.INCORRECT:
      return <FontAwesomeIcon icon={faTimes} />;
    default:
      return undefined;
  }
}

const PostDetails = ({ post }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const date = new Date(post.createdAt);

  return (
    <Card
      onClick={() => history.push(`/posts/${post.id}`)}
      className={clsx(classes.root, "post-details")}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="User" className={classes.avatar}>
            {post.user && post.user.username[0]}
          </Avatar>
        }
        title={post.user ? post.user.username : ""}
        subheader={date.toLocaleString("hu-hu")}
      />
      <Suspense
        fallback={
          <CardMedia className={classes.media} image={logo} title="Post" />
        }
      >
        <LazyPostImage className={classes.media} image={post.url} />
      </Suspense>
      {post.comments.length > 0 && (
        <CardContent>
          <List className={classes.root}>
            {post.comments.map((comment) => (
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar aria-label="User" className={classes.avatar}>
                      {comment.user.username[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {comment.text}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    {getStatusIcon(comment.status)}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
};

export default PostDetails;
