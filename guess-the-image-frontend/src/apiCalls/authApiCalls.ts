import { doApiCall } from "./doApiCall";
import RegistrationData from "../DTO/auth/RegistrationData";
import LoginData from "../DTO/auth/LoginData";
import LoginResponse from "../DTO/auth/LoginResponse";

export function loginCall(loginData: LoginData) {
  return doApiCall<LoginResponse>("post", "/login", loginData);
}

export function registerCall(registerData: RegistrationData) {
  return doApiCall<string>("post", "/register", registerData);
}
