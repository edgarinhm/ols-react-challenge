import logoImg from '/logo.png';
import styles from './login.module.scss';
import { FormEvent, useId, useState } from 'react';
import { FormControl } from 'common/components/form-control/form-control';
import { Link } from 'react-router-dom';

const initialState = {
  username: '',
  password: '',
  expireSession: false,
};

type LoginFormFields = typeof initialState;

const Login = (): JSX.Element => {
  const id = useId();
  const [loginFormFields, setLoginFormFields] =
    useState<LoginFormFields>(initialState);

  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault();
    console.log('loginFormFields', loginFormFields);
  };

  const onUserNameChange = (value: string): void => {
    setLoginFormFields((state) => ({ ...state, username: value }));
  };

  const onPasswordChange = (value: string): void => {
    setLoginFormFields((state) => ({ ...state, password: value }));
  };
  const onCheckboxChange = (): void => {
    setLoginFormFields((state) => ({
      ...state,
      expireSession: !state.expireSession,
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.loginPanel}>
          <div className={styles.loginPanelBody}>
            <header>
              <Link to="#">
                <img src={logoImg} loading="lazy" alt={'login logo'} />
              </Link>
              <h1>{'Bienvenido al gestor de proyectos!'}</h1>
              <span>{'Necesitamos tu usuario y contraseña'}</span>
            </header>

            <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
              <FormControl.Input
                id={`${id}-username`}
                type="text"
                placeholder={'Nombre de usuario Ej: nombre.apellido'}
                onChange={(event) => onPasswordChange(event.target.value)}
                className={styles.input}
              />
              <FormControl.Input
                id={`${id}-password`}
                type="password"
                onChange={(event) => onUserNameChange(event.target.value)}
                placeholder={'Aqui va tu constraseña'}
              />
              <button type="submit" className={styles.loginButton}>
                {'Ingresar'}
              </button>
              <div className={styles.actions}>
                <FormControl.CheckInput
                  type="checkbox"
                  checked={loginFormFields.expireSession}
                  id={`${id}-expire-session`}
                  label={'Permanecer Conectado'}
                  labelClassName={styles.standardLabel}
                  onChange={onCheckboxChange}
                />
                <Link to="#">{'Recuperar Contraseña'}</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
