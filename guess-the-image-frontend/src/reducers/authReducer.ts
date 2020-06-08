import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/auth/types";
import RootAction from "../actions/RootAction";

interface State {
  token?: string | null;
  failure: boolean;
  message?: string;
}

const initialState: State = { failure: false };

const errors = (state: State = initialState, action: RootAction): State => {
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      token: action.token,
      failure: false,
      message: undefined,
    };
  }

  if (action.type === LOGIN_FAILURE) {
    return {
      ...state,
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
      token: undefined,
      failure: false,
      message: undefined,
    };
  }

  if (action.type === REGISTER_FAILURE) {
    return {
      ...state,
      token: undefined,
      failure: true,
      message: action.message,
    };
  }

  return state;
};

export default errors;
