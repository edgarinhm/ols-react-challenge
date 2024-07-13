import styles from "./login.module.scss";
import { FormEvent, useEffect, useId, useState } from "react";
import { FormControl } from "common/components/form-control/form-control";
import { Link } from "react-router-dom";
import { LoginFieldsModel, loginFields } from "./initial-data";
import { useLoginValidator } from "./use-login-validator";
import { Spinner } from "common/components/spinner/spinner";
import { routes } from "routes";
import { useAuthentication } from "common/authentication/authentication";
import { Messages } from "common/constants/messages-constants";
import { useSharedStorage } from "common/state-management/shared-storage";
import { LocalStorageKeys } from "common/enums/local-storage-keys";
import { basename } from "common/constants/basename-constants";
import LogoImg from "/logo.png";

const Login = (): JSX.Element => {
  const id = useId();
  const [loginForm, setLoginForm] = useState<LoginFieldsModel>(loginFields);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [hasError, errors] = useLoginValidator(loginForm);
  const redirectURL = basename + routes.home.name;
  const [validationMessageError, setValidationMessageError] = useState("");

  const { validateAuthenticateUser, handleLoginRedirect, handleAuthenticatedRedirect } =
    useAuthentication();

  const updateStorage = useSharedStorage((state) => state.updateStorage);

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setSubmitted(true);
    setValidationMessageError("");

    if (!hasError) {
      setIsLoading(true);
      try {
        const isAuthenticated = await validateAuthenticateUser(
          loginForm.username,
          loginForm.password
        );
        if (!isAuthenticated) {
          setValidationMessageError(Messages.LoginAuthenticationFailure);
        } else {
          updateStorage(LocalStorageKeys.tokenStartTime, Date.now());
          updateStorage(LocalStorageKeys.noExpireSession, loginForm.noExpireSession);
          handleLoginRedirect(redirectURL);
        }
      } catch (error) {
        setValidationMessageError(Messages.UnexpectedError);
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
      noExpireSession: !state.noExpireSession,
    }));
  };

  useEffect(() => {
    handleAuthenticatedRedirect(redirectURL);
  }, [handleAuthenticatedRedirect, redirectURL]);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <header>
          <Link to="#">
            <img className={styles.logo} src={LogoImg} loading="lazy" alt={"login logo"} />
          </Link>
          <h4>{Messages.LoginTitle}</h4>
          <h6>{Messages.LoginDescription}</h6>
        </header>

        {validationMessageError && <div className={styles.alert}>{validationMessageError}</div>}
        <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
          <FormControl.Input
            id={`${id}-username`}
            type="text"
            placeholder={Messages.LoginUsernamePlaceholder}
            onChange={(event) => onUserNameChange(event.target.value)}
            className={styles.input}
            errors={errors.userName}
            showErrors={submitted}
          />
          <FormControl.Input
            id={`${id}-password`}
            type="password"
            placeholder={Messages.LoginPasswordPlaceholder}
            onChange={(event) => onPasswordChange(event.target.value)}
            className={styles.input}
            errors={errors.password}
            showErrors={submitted}
            data-qa={"password"}
          />
          <button type="submit" className={styles.loginButton}>
            {Messages.LoginSubmitButton}
          </button>
          <div className={styles.actions}>
            <FormControl.CheckInput
              type="checkbox"
              checked={loginForm.noExpireSession}
              id={`${id}-no-expire-session`}
              label={Messages.LoginExpireSession}
              labelClassName={styles.standardLabel}
              onChange={onCheckboxChange}
            />
            <Link to="#">{Messages.LoginPassworRecover}</Link>
          </div>
          <div className={styles.createAccount}>
            {Messages.LoginNoAccount}
            <Link to={routes.register.name}>{Messages.LoginCreateAccount}</Link>
          </div>
        </form>
      </div>
      <Spinner show={isLoading} />
    </div>
  );
};

export default Login;
