import { doApiCall } from "./doApiCall";
import Post from "../DTO/post/Post";

export function getPostCall(id: string) {
  return doApiCall<Post>("get", `/posts/${id}`);
}

/*export function getPostsCall() {
  return doApiCall<PostPage>("get", `/posts/${id}`);
}*/

export function createPostCall(post: FormData) {
  return doApiCall<Post>("post", `/posts`, post, {
    headers: { "content-type": "multipart/form-data" },
  });
}
