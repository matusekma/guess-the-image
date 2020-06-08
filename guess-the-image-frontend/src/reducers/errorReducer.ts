import { API_ERROR, CLEAR_ERRORS } from "../actions/error/types";

interface State {
  apiError?: { message: string };
}

const initialState: State = {};

const errors = (state: State = initialState, action: any): State => {
  if (action.type === CLEAR_ERRORS) {
    return initialState;
  }

  if (action.type === API_ERROR) {
    return {
      ...state,
      apiError: {
        message: action.error.message,
      },
    };
  }

  return state;
};

export default errors;
