import { Messages } from "common/constants/messages-constants";
import { Link } from "react-router-dom";
import LogoImg from "/logo.png";
import styles from "./register.module.scss";
import { Spinner } from "common/components/spinner/spinner";
import { FormEvent, useId, useState } from "react";
import { FormControl } from "common/components/form-control/form-control";
import { CountryModel } from "common/enums/country-type";
import { registerFields, RegisterFieldsModel } from "./initial-data";
import { routes } from "routes";
import { useRegisterValidator } from "./use-register-validator";

const Register = (): JSX.Element => {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterFieldsModel>(registerFields);
  const [validationMessageError, setValidationMessageError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [hasErrors, errors] = useRegisterValidator(registerForm);

  const changeForm = (key: string, value: string): void => {
    setRegisterForm((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const onUserNameChange = (value: string): void => {
    changeForm("username", value);
  };

  const onEmailChange = (value: string): void => {
    changeForm("email", value);
  };

  const onCountryChange = (value: string): void => {
    changeForm("country", value);
  };

  const onPasswordChange = (value: string): void => {
    changeForm("password", value);
  };

  const onCheckboxChange = (): void => {
    setRegisterForm((state) => ({
      ...state,
      termsAndConditions: !state.termsAndConditions,
    }));
  };

  const handleSubmit = (): void => {
    setSubmitted(true);
    if (!hasErrors) {
      setIsLoading(true);
    }
    setValidationMessageError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <header>
          <Link to="#">
            <img className={styles.logo} src={LogoImg} loading="lazy" alt={"register logo"} />
          </Link>
          <h4>{Messages.RegisterTitle}</h4>
          <h6>{Messages.RegisterDescription}</h6>
        </header>

        {validationMessageError && <div className={styles.alert}>{validationMessageError}</div>}

        <form
          noValidate
          autoComplete="off"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl.Input
            id={`${id}-username`}
            type="text"
            placeholder={Messages.RegisterUsernamePlaceholder}
            onChange={(event) => onUserNameChange(event.target.value)}
            className={styles.input}
            errors={errors.userName}
            showErrors={submitted}
          />
          <FormControl.Input
            id={`${id}-email`}
            type="email"
            placeholder={Messages.RegisterEmailPlaceholder}
            onChange={(event) => onEmailChange(event.target.value)}
            className={styles.input}
            errors={errors.email}
            showErrors={submitted}
          />
          <FormControl.Select
            id={`${id}-country`}
            errors={errors.country}
            showErrors={submitted}
            onChange={(event) => onCountryChange(event.target.value)}
          >
            {!registerForm.country && (
              <FormControl.SelectOption label={Messages.RegisterCountryPlaceholder} value={""} />
            )}
            {CountryModel?.map((country) => (
              <FormControl.SelectOption
                key={country.id}
                label={country.name}
                value={country.code}
              />
            ))}
          </FormControl.Select>
          <FormControl.Input
            id={`${id}-password`}
            type="password"
            placeholder={Messages.RegisterPasswordPlaceholder}
            onChange={(event) => onPasswordChange(event.target.value)}
            className={styles.input}
            errors={errors.password}
            showErrors={submitted}
            data-qa={"password"}
          />
          <div className={styles.actions}>
            <FormControl.CheckInput
              type="checkbox"
              required={true}
              checked={registerForm.termsAndConditions}
              id={`${id}-term-and-conditions`}
              label={Messages.RegisterTermsAndConditions}
              labelClassName={styles.standardLabel}
              onChange={onCheckboxChange}
              errors={errors.termsAndConditions}
              showErrors={submitted}
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            {Messages.RegisterSubmitButton}
          </button>
          <div className={styles.redirectLogin}>
            {Messages.RegisterHaveAccount}
            <Link to={routes.login.name}>{Messages.RegisterRedirectLogin}</Link>
          </div>
        </form>
      </div>
      <Spinner show={isLoading} />
    </div>
  );
};

export default Register;
