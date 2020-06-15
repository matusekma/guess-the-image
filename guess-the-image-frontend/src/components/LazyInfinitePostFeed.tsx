import React, { useState, useEffect } from "react";
import { getPostsCall } from "../apiCalls/postApiCalls";
import debounce from "lodash.debounce";
import Post from "../DTO/post/Post";
import PostComponent from "./PostComponent";

const LazyInfinitePostFeed = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = debounce(() => {
    // Checks that the page has scrolled to the bottom
    if (
      !isFetching &&
      document.body.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) <
        10
    ) {
      console.log("scroll");
      setIsFetching(true);
    }
  }, 100);

  const fetchData = async () => {
    const postPage = await getPostsCall(page, 1);
    setTotalPages(postPage.totalPages);
    setPage(page + 1);
    setPostList(() => {
      return [...postList, ...postPage.posts];
    });
  };

  useEffect(() => {
    if (!isFetching || page >= totalPages) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div className="post-feed container-fluid pt-3">
      {postList.map((post) => (
        <div
          key={post.id}
          className="row justify-content-center pb-2 pb-md-5 px-2"
        >
          <PostComponent post={post} />
        </div>
      ))}
    </div>
  );
};

export default LazyInfinitePostFeed;
