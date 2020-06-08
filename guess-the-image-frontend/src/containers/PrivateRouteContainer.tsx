import { connect, ConnectedProps } from "react-redux";

import PrivateRoute from "../components/PrivateRoute";
import { RootState } from "../reducers/rootReducer";

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

const mapDispatchToProps = () => {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PrivateRoute);
