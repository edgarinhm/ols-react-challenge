import logo from '/logo.png';
import styles from './login.module.scss';
import { FormEvent } from 'react';
import { FormControl } from 'common/components/form-control/form-control';

const Login = (): JSX.Element => {
  const handleOnSubmit = (event: FormEvent): void => {
    event.preventDefault();
    console.log('handleOnSubmit');
  };
  return (
    <div className={styles.container}>
      <img src={logo} alt={'logo'} loading="lazy" className={styles.logo} />
      <span>{'Bienvenido al gestor de proyectos!'}</span>
      <span>{'Necesitamos tu usuario y contraseña'}</span>
      <div className={styles.login}>
        <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
          <FormControl.Input
            type="text"
            placeholder={'Nombre de usuario Ej: nombre.apellido'}
            className={styles.input}
          />
          <FormControl.Input
            type="password"
            placeholder={'Aqui va tu constraseña'}
          />
          <button type="submit" className={styles.loginButton}>
            {'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
