import { doApiCall } from "./doApiCall";
import Post from "../DTO/post/Post";
import PostPage, {
  PostPageResponse,
  convertToPostPage,
} from "../DTO/post/PostPage";

export function getPostCall(id: string) {
  return doApiCall<Post>("get", `/posts/${id}`);
}

export function getPostsCall(page = 0, pageSize = 5) {
  return doApiCall<PostPageResponse>("get", `/posts`, null, {
    params: { pageSize, page },
  }).then<PostPage>((response) => convertToPostPage(response));
}

export function createPostCall(post: FormData) {
  return doApiCall<Post>("post", `/posts`, post, {
    headers: { "content-type": "multipart/form-data" },
  });
}
