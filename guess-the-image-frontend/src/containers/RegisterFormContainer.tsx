import { connect, ConnectedProps } from "react-redux";

import RegisterForm from "../components/RegisterForm";
import { RootState } from "../reducers/rootReducer";
import { register } from "../actions/auth/actionCreators";
import RegistrationData from "../DTO/auth/RegistrationData";

const mapStateToProps = (state: RootState) => {
  return {
    failure: state.auth.failure,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (registrationData: RegistrationData) =>
      dispatch(register(registrationData)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegisterForm);
