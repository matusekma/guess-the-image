import User from "../user/User";

export default interface LoginResponse {
  token: string;
  user: User;
}
