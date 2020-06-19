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
import { CardContent } from "@material-ui/core";

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

const PostDetails = ({ post }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const date = new Date(post.createdAt);

  return (
    <Card className={clsx(classes.root, "post-details")}>
      <CardHeader
        avatar={
          <Avatar aria-label="User" className={classes.avatar}>
            {post.user && post.user.username[0]}
          </Avatar>
        }
        title={post.user ? post.user.username : ""}
        subheader={date.toLocaleString("hu-hu")}
      />
      <CardContent>
        <Suspense
          fallback={
            <CardMedia className={classes.media} image={logo} title="Post" />
          }
        >
          <LazyPostImage className={classes.media} image={post.url} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default PostDetails;