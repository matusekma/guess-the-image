import { doApiCall } from "./doApiCall";
import Comment, { CommentStatus } from "../DTO/post/Comment";

export function updateCommentStatus(
  postId: number,
  commentId: number,
  status: CommentStatus
) {
  return doApiCall<Comment>(
    "post",
    `posts/${postId}/comments/${commentId}/status`,
    { status }
  );
}

 export function createCommentForPost(postId: number, text: string) {
  return doApiCall<Comment>("post", `posts/${postId}/comments`, { text });
}
