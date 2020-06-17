export enum CommentStatus {
  INITIAL = "INITIAL",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
}

export default interface Comment {
  id: number;

  text: string;

  status: CommentStatus;

  createdAt: string;

  user: { username: string };
}
