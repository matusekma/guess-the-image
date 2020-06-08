export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  token?: string | null;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  message: string;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

export interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  message: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction;
