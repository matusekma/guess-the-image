import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getPostCall } from "../apiCalls/postApiCalls";
import PostDetails from "./PostDetails";
import Post from "../DTO/post/Post";
import PostComments from "./PostComments";
import { updateCommentStatus } from "../apiCalls/commentApiCalls";
import { CommentStatus } from "../DTO/post/Comment";

interface Props {}

const PostDetailsPage = ({}: Props) => {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const post = await getPostCall(id);
    setPost(post);
  };

  async function changeStatus(commentId: number, status: CommentStatus) {
    if (post) {
      try {
        setLoading(true);
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
        setError("Hiba!");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="post-details-page container-fluid pt-3 pb-4">
      {post && (
        <>
          <div className="row justify-content-center px-2 mb-2">
            <PostDetails post={post} />
          </div>
          <div className="row justify-content-center px-2">
            <PostComments
              comments={post.comments}
              setCommentStatus={changeStatus}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
