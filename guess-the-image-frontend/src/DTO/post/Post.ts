import PostWithoutComments from "./PostWithoutComments";
import Comment from "./Comment";

export default interface Post extends PostWithoutComments {
  comments: Comment[];
}
