import { LoginValidator } from 'common/validators/login-validator';
import { LoginFieldsModel } from './initial-data';
import { useEffect, useState } from 'react';

export type LogingErrors = {
  [Property in keyof typeof LoginValidator]?: string[];
};
export const useLoginValidator = (
  login: LoginFieldsModel
): ValidationResult<LogingErrors> => {
  const { username, password } = login;
  const [errors, setErrors] = useState<LogingErrors>({});
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    let newHasErrors = false;
    const newErrors: LogingErrors = {};

    const userNameErrors = LoginValidator.userName(username);
    const passwordErrors = LoginValidator.password(password);

    newHasErrors ||= !!userNameErrors.length || !!passwordErrors.length;

    newErrors.userName = userNameErrors;
    newErrors.password = passwordErrors;

    setErrors(newErrors);
    setHasErrors(newHasErrors);
  }, [username, password]);

  return [hasErrors, errors];
};
