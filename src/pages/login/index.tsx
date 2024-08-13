import { parsePath, useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/Button";
import { Form } from "../../shared/components/Form";
import { Input } from "../../shared/components/Input";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/contexts/auth";
import {
  MdPerson,
  MdSecurity,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import "./styles.scss";
import { validateEmail } from "../../shared/utils/validateEmail";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setUPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<any>(undefined);
  const [isValidPassword, setIsValidPassword] = useState<boolean>();

  const context = useContext(AuthContext);
  const navigation = useNavigate();

  const handleUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [username]
  );

  const onBlurEmailIsValid = () => {
    if (username.length) {
      let isValid = validateEmail(username);
      setIsValidEmail(isValid);
    } else {
      setIsValidEmail(undefined);
    }
  };

  const onBlurPasswordIsValid = () => {
    if (password.length > 0 && password.length < 8) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const handlePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUPassword(event.target.value);
    },
    [password]
  );

  const handleLogin = () => {
    context.Login(username, password);
  };

  useEffect(() => {
    if (context.token) navigation('/task')
  }, [context.token])

  useEffect(() => {
    localStorage.removeItem("cache");
  }, []);

  return (
    <div className="container-signin">
      <Form className="form-signin">
        <h1>Sign In</h1>
        <div className="username-container">
          <MdPerson className="username-icon" />
          <Input
            type="text"
            placeholder="Typing your username"
            className={
              isValidEmail === false ? "username border-error" : "username"
            }
            value={username}
            onChange={handleUsername}
            onBlur={onBlurEmailIsValid}
            required
          />
          {isValidEmail === false && <p className="error">E-mail inválido!</p>}
        </div>
        <div className="password-container">
          {showPassword ? (
            <MdVisibility
              className="show-password"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <MdVisibilityOff
              className="hide-password"
              onClick={() => setShowPassword(true)}
            />
          )}
          <MdSecurity className="password-icon" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Typing your password"
            value={password}
            className={
              isValidPassword === false ? "password border-error" : "password"
            }
            onBlur={onBlurPasswordIsValid}
            onChange={handlePassword}
            required
          />
          {isValidPassword === false && (
            <p className="error">A senha precisa ter no minímo 8 caracteres</p>
          )}
        </div>
        <a href="" className="reset-password">
          Forgot your password?
        </a>
        <Button
          disabled={false}
          className="btn-signin"
          type="button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};
