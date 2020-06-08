import { doApiCall } from "./doApiCall";
import RegistrationData from "../DTO/auth/RegistrationData";
import LoginData from "../DTO/auth/LoginData";

export function loginCall(loginData: LoginData) {
  return doApiCall<string>("post", "/login", loginData);
}

export function registerCall(registerData: RegistrationData) {
  return doApiCall<string>("post", "/register", registerData);
}

/*export function addOrUpdateCourseCall(course: Course, isNew: boolean) {
  return doApiCall<Course>(
    isNew ? "post" : "put",
    isNew ? "api/courses" : `/api/courses/${course.id}`,
    course
  );
}*/
