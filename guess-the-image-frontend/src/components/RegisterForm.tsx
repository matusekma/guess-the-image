import React, { useState } from "react";
import { PropsFromRedux } from "../containers/RegisterFormContainer";

interface Props extends PropsFromRedux {}

const RegisterForm = ({ register, message }: Props) => {
  const [error, setError] = useState<string | undefined>("");

  const [username, setUsername] = useState<string | undefined>();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [passwordRepeat, setPasswordRepeat] = useState<string | undefined>();

  function checkAndSubmit(e: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    if (username && email && password) {
      if (password === passwordRepeat) {
        register({ username, firstName, lastName, email, password });
      } else {
        setError("A jelszavak nem egyeznek!");
      }
    } else {
      setError("Töltsd ki a kötelező mezőket!");
    }
  }

  return (
    <form onSubmit={(e) => checkAndSubmit(e)}>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control input-primary"
              aria-describedby="Username"
              placeholder="Felhasználónév*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="email"
              className="form-control input-primary"
              aria-describedby="Email"
              placeholder="E-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control input-primary"
              aria-describedby="First name"
              placeholder="Keresztnév"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control input-primary"
              aria-describedby="Last name"
              placeholder="Vezetéknév"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="password"
              className="form-control input-primary"
              placeholder="Jelszó*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="form-group">
            <input
              type="password"
              className="form-control input-primary"
              placeholder="Jelszó ismételten*"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 text-center">
        <span>{message || error}</span>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="button-primary">
          Regisztráció
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
