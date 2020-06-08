import {
  LOGIN_SUCCESS,
  LoginSuccessAction,
  LoginFailureAction,
  LOGIN_FAILURE,
  LOGOUT,
  LogoutAction,
  RegisterSuccessAction,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterFailureAction,
} from "./types";
import { loginCall, registerCall } from "../../apiCalls/authApiCalls";
import LoginData from "../../DTO/auth/LoginData";
import RegistrationData from "../../DTO/auth/RegistrationData";
import { AppThunk } from "../../store";
import { history } from "../../App";
import { axiosInstance } from "../../apiCalls/axiosConfig";

export function loginSuccess(token: string | null): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

function loginFailure(message: string): LoginFailureAction {
  return {
    type: LOGIN_FAILURE,
    message,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}

export function login(loginData: LoginData): AppThunk {
  return (dispatch) => {
    loginCall(loginData)
      .then((token: string) => {
        localStorage.setItem("token", token);
        dispatch(loginSuccess(token));
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
        history.push("/");
      })
      .catch((e) => dispatch(loginFailure(e.message)));
  };
}

export function registerSuccess(): RegisterSuccessAction {
  return {
    type: REGISTER_SUCCESS,
  };
}

function registerFailure(message: string): RegisterFailureAction {
  return {
    type: REGISTER_FAILURE,
    message,
  };
}

export function register(registrationData: RegistrationData): AppThunk {
  return (dispatch) => {
    registerCall(registrationData)
      .then(() => {
        dispatch(registerSuccess());
        history.push("/");
      })
      .catch((e) => dispatch(registerFailure(e.message)));
  };
}
