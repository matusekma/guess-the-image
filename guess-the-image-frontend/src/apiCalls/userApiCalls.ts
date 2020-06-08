import { doApiCall } from "./doApiCall";
import ProfileData from "../DTO/user/ProfileData";

export function getProfileCall() {
  return doApiCall<ProfileData>("get", "/user/me");
}
