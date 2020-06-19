import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import debounce from "lodash.debounce";
import PostWithoutComments from "../DTO/post/PostWithoutComments";
import PostComponent from "./PostListElementComponent";
import PostPage from "../DTO/post/PostPage";

interface Props {
  getPosts: (page?: number, pageSize?: number) => Promise<PostPage>;
}
const LazyInfinitePostFeed = ({ getPosts }: Props) => {
  const history = useHistory();
  const [postList, setPostList] = useState<PostWithoutComments[]>([]);
  const [isFetching, _setIsFetching] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [page, _setPage] = useState(0);
  const [totalPages, _setTotalPages] = useState(0);

  // CREATE REFS TO ACCESS STATE INSIDE EVENT HANDLER
  const pageRef = React.useRef(page);

  const setPage = (data: number) => {
    pageRef.current = data;
    _setPage(data);
  };

  const totalPagesRef = React.useRef(totalPages);

  const setTotalPages = (data: number) => {
    totalPagesRef.current = data;
    _setTotalPages(data);
  };

  const isFetchingRef = React.useRef(isFetching);

  const setIsFetching = (data: boolean) => {
    isFetchingRef.current = data;
    _setIsFetching(data);
  };

  useEffect(() => {
    const handleScroll = debounce(function () {
      // Checks that the page has scrolled to the bottom
      if (
        !isFetchingRef.current &&
        document.body.offsetHeight -
          (window.innerHeight + document.documentElement.scrollTop) <
          10 &&
        pageRef.current < totalPagesRef.current
      ) {
        setIsFetching(true);
      }
    }, 100);

    setIsFetching(true);
    fetchData().then((totalP) => {
      setTotalPages(totalP);
      setIsFetching(false);
    });

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const postPage = await getPosts(page);
    if (totalPages === page + 1) {
      setAllLoaded(true);
    }
    setPage(page + 1);
    setPostList([...postList, ...postPage.posts]);
    return postPage.totalPages;
  };

  useEffect(() => {
    const fetchMoreListItems = async () => {
      await fetchData();
      setIsFetching(false);
    };

    if (!isFetching || allLoaded) return;
    fetchMoreListItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, allLoaded]);

  return (
    <div className="post-feed container-fluid pt-3">
      {postList && postList.length > 0
        ? postList.map((post) => (
            <div
              key={post.id}
              className="row justify-content-center pb-2 pb-md-5 px-2"
            >
              <PostComponent post={post} />
            </div>
          ))
        : !isFetching &&
          page >= totalPages && (
            <h2 className="text-center mt-3">Még nincsenek posztok....</h2>
          )}
      {isFetching && (
        <div className="row justify-content-center pb-2 pb-md-5 px-2">
          <CircularProgress />
        </div>
      )}
      <Fab
        className="fab-add-post"
        aria-label="Új poszt"
        onClick={() => history.push("/new")}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default LazyInfinitePostFeed;
