import User from "../user/User";

export default interface PostWithoutComments {
  id: number;

  url: string;

  createdAt: string;

  archived: boolean;

  user: User;
}
