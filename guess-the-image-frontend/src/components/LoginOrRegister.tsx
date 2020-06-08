import React from "react";

const LoginOrRegister = () => {
  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div>
          <form onSubmit={() => console.log("asd")}>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                type="text"
                className="form-control input-primary"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control input-primary"
                id="inputPassword"
                placeholder="Password"
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="button-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
