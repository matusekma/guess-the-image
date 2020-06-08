import React, { useState } from "react";
import { PropsFromRedux } from "../containers/LoginFormContainer";
import { useHistory } from "react-router-dom";

interface Props extends PropsFromRedux {}

const LoginForm = ({ login, message, token }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function checkAndSubmit(e: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    if (username && password) {
      login({ username, password });
    } else {
      setError("Tölts ki minden mezőt!");
    }
  }

  return (
    <form onSubmit={(e) => checkAndSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control input-primary"
          aria-describedby="Username"
          placeholder="Felhasználónév"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control input-primary"
          placeholder="Jelszó"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="mb-4 text-center">
        <span>{message || error}</span>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="button-primary">
          Bejelentkezés
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
