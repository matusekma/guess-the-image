import User from "../user/User";

export default interface Post {
  id: string;

  url: string;

  createdAt: Date;

  comments: Comment[];

  user: User;
}
