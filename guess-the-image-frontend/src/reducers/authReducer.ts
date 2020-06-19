import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/auth/types";
import RootAction from "../actions/RootAction";
import User from "../DTO/user/User";

interface State {
  token?: string | null;
  user?: User | null;
  failure: boolean;
  message?: string;
}

const initialState: State = { failure: false };

const errors = (state: State = initialState, action: RootAction): State => {
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      user: action.user,
      token: action.token,
      failure: false,
      message: undefined,
    };
  }

  if (action.type === LOGIN_FAILURE) {
    return {
      ...state,
      user: undefined,
      token: undefined,
      failure: true,
      message: action.message,
    };
  }

  if (action.type === LOGOUT) {
    return initialState;
  }

  if (action.type === REGISTER_SUCCESS) {
    return {
      ...state,
      user: undefined,
      token: undefined,
      failure: false,
      message: undefined,
    };
  }

  if (action.type === REGISTER_FAILURE) {
    return {
      ...state,
      user: undefined,
      token: undefined,
      failure: true,
      message: action.message,
    };
  }

  return state;
};

export default errors;
