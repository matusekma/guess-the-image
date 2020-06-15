import User from "../user/User";

export default interface Post {
  id: number;

  url: string;

  createdAt: string;

  archived: boolean;

  comments: Comment[];

  user: User;
}
