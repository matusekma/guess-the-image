import { connect, ConnectedProps } from "react-redux";

import LoginForm from "../components/LoginForm";
import { RootState } from "../reducers/rootReducer";
import { login } from "../actions/auth/actionCreators";
import LoginData from "../DTO/auth/LoginData";

const mapStateToProps = (state: RootState) => {
  return {
    token: state.auth.token,
    failure: state.auth.failure,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (loginData: LoginData) => dispatch(login(loginData)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginForm);
