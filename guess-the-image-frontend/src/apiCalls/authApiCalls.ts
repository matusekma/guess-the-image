import { doApiCall } from "./doApiCall";
import RegistrationData from "../DTO/auth/RegistrationData";
import LoginData from "../DTO/auth/LoginData";

export function loginCall(loginData: LoginData) {
  return doApiCall<string>("post", "/login", loginData);
}

export function registerCall(registerData: RegistrationData) {
  return doApiCall<string>("post", "/register", registerData);
}
