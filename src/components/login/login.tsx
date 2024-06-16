import logoImg from "/logo.png";
import styles from "./login.module.scss";
import { FormEvent, useEffect, useId, useState } from "react";
import { FormControl } from "common/components/form-control/form-control";
import { Link } from "react-router-dom";
import { LoginFieldsModel, loginFields } from "./initial-data";
import { useLoginValidator } from "./use-login-validator";
import { Spinner } from "common/components/spinner/spinner";
import { routes } from "routes";
import { useAuthentication } from "common/authentication/authentication";

const Login = (): JSX.Element => {
  const id = useId();
  const [loginForm, setLoginForm] = useState<LoginFieldsModel>(loginFields);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [hasError, errors] = useLoginValidator(loginForm);
  const redirectURL = routes.dashboard.name;

  const { validateAuthenticateUser, handleLoginRedirect, handleAuthenticatedRedirect } =
    useAuthentication();

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setSubmitted(true);

    if (!hasError) {
      setIsLoading(true);
      try {
        const isAuthenticated = await validateAuthenticateUser(
          loginForm.username,
          loginForm.password
        );
        if (!isAuthenticated) {
          console.log("user not valid!");
        } else {
          console.log("logged In!");
          handleLoginRedirect(redirectURL);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    setIsLoading(false);
  };

  const onUserNameChange = (value: string): void => {
    setLoginForm((state) => ({ ...state, username: value }));
  };

  const onPasswordChange = (value: string): void => {
    setLoginForm((state) => ({ ...state, password: value }));
  };
  const onCheckboxChange = (): void => {
    setLoginForm((state) => ({
      ...state,
      expireSession: !state.expireSession,
    }));
  };

  useEffect(() => {
    handleAuthenticatedRedirect(redirectURL);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.loginPanel}>
          <div className={styles.loginPanelBody}>
            <header>
              <Link to="#">
                <img src={logoImg} loading="lazy" alt={"login logo"} />
              </Link>
              <h1>{"Bienvenido al gestor de proyectos!"}</h1>
              <span>{"Necesitamos tu usuario y contraseña"}</span>
            </header>

            <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
              <FormControl.Input
                id={`${id}-username`}
                type="text"
                placeholder={"Nombre de usuario Ej: nombre.apellido"}
                onChange={(event) => onUserNameChange(event.target.value)}
                className={styles.input}
                errors={errors.userName}
                showErrors={submitted}
              />
              <FormControl.Input
                id={`${id}-password`}
                type="password"
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder={"Aqui va tu constraseña"}
                errors={errors.password}
                showErrors={submitted}
                data-qa={"password"}
              />
              <button type="submit" className={styles.loginButton}>
                {"Ingresar"}
              </button>
              <div className={styles.actions}>
                <FormControl.CheckInput
                  type="checkbox"
                  checked={loginForm.expireSession}
                  id={`${id}-expire-session`}
                  label={"Permanecer Conectado"}
                  labelClassName={styles.standardLabel}
                  onChange={onCheckboxChange}
                />
                <Link to="#">{"Recuperar Contraseña"}</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Spinner show={isLoading} />
    </div>
  );
};

export default Login;
