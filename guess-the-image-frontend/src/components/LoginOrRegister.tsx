import React, { useState } from "react";
import LoginFormContainer from "../containers/LoginFormContainer";
import RegisterFormContainer from "../containers/RegisterFormContainer";

const LoginOrRegister = () => {
  const [loginTabActive, setLoginTabActive] = useState(true);

  return (
    <div className="auth-forms-page container-fluid pt-5">
      <div className="row justify-content-center pt-5">
        <div className="auth-forms-container">
          <div className="row tabs pb-2 mb-2">
            <div
              onClick={() => setLoginTabActive(true)}
              className={`col-6 tab ${loginTabActive ? "active" : ""}`}
            >
              Bejelentkezés
            </div>
            <div
              onClick={() => setLoginTabActive(false)}
              className={`col-6 tab ${!loginTabActive ? "active" : ""}`}
            >
              Regisztráció
            </div>
          </div>
          <div className="row">
            {loginTabActive ? (
              <LoginFormContainer />
            ) : (
              <RegisterFormContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
