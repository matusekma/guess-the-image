import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getPostCall } from "../apiCalls/postApiCalls";
import PostDetails from "./PostDetails";
import Post from "../DTO/post/Post";

interface Props {}

const PostDetailsPage = ({}: Props) => {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const post = await getPostCall(id);
    setPost(post);
  };

  return (
    <div className="post-details-page container-fluid pt-3">
      {post && (
        <div key={post.id} className="row justify-content-center px-2">
          <PostDetails post={post} />
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
