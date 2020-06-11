import React from "react";
import Post from "./Post";

const PostFeed = () => {
  return (
    <div className="post-feed container-fluid pt-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <div key={n} className="row justify-content-center pb-5">
          <Post />
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
