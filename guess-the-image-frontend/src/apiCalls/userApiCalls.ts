import { doApiCall } from "./doApiCall";
import ProfileData from "../DTO/user/User";

export function getProfileCall() {
  return doApiCall<ProfileData>("get", "/users/me");
}
