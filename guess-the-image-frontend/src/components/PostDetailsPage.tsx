import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { getPostCall } from "../apiCalls/postApiCalls";
import PostDetails from "./PostDetails";
import Post from "../DTO/post/Post";
import PostComments from "./PostComments";
import {
  updateCommentStatus,
  createCommentForPost,
} from "../apiCalls/commentApiCalls";
import { CommentStatus } from "../DTO/post/Comment";
import PostCommentWriter from "./PostCommentWriter";

interface Props {}

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState("");
  const [commentCreationLoading, setCommentCreationLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPost(await getPostCall(id));
    };
    fetchData();
  }, [id]);

  async function changeStatus(commentId: number, status: CommentStatus) {
    if (post) {
      try {
        const updatedComment = await updateCommentStatus(
          post.id,
          commentId,
          status
        );
        setPost({
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          ),
        });
      } catch {
        setError("Nem sikerült a komment státuszának megváltoztatása!");
      }
    }
  }

  async function createComment(text: string) {
    if (post) {
      try {
        setCommentCreationLoading(true);
        const createdComment = await createCommentForPost(post.id, text);

        setPost({
          ...post,
          comments: [createdComment, ...post.comments],
        });
      } catch {
        setError("Nem sikerült a komment létrehozása!");
      } finally {
        setCommentCreationLoading(false);
      }
    }
  }

  return (
    <div className="post-details-page container-fluid pt-3 pb-4">
      <div className="row justify-content-center">
        <div className="col-11 col-md-8">
          {post && (
            <>
              <div className="row justify-content-center px-2 mb-2">
                <PostDetails post={post} />
              </div>
              <div className="row justify-content-center px-2">
                <PostCommentWriter
                  createComment={createComment}
                  loading={commentCreationLoading}
                />
              </div>
              <div className="row justify-content-center px-2">
                <PostComments
                  postCreatorId={post.user.id}
                  comments={post.comments}
                  setCommentStatus={changeStatus}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setError("")}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default PostDetailsPage;
