import React, { Suspense } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

import PostWithoutComments from "../DTO/post/PostWithoutComments";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

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
  })
);

interface Props {
  post: PostWithoutComments;
}

const PostListElementComponent = ({ post }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const date = new Date(post.createdAt);
  return (
    <Card
      onClick={() => history.push(`/posts/${post.id}`)}
      className={clsx(classes.root, "post")}
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
    </Card>
  );
};

export default PostListElementComponent;
