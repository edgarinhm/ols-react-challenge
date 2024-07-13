import { RegisterValidator } from "common/validators/register-validator";
import { RegisterFieldsModel } from "./initial-data";
import { useEffect, useState } from "react";

export type RegisterErrors = {
  [Property in keyof typeof RegisterValidator]?: string[];
};
export const useRegisterValidator = (
  register: RegisterFieldsModel
): ValidationResult<RegisterErrors> => {
  const { username, password, email, country, termsAndConditions } = register;
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    let newHasErrors = false;
    const newErrors: RegisterErrors = {};

    const userNameErrors = RegisterValidator.userName(username);
    const emailErrors = RegisterValidator.email(email);
    const countryErrors = RegisterValidator.country(country);
    const passwordErrors = RegisterValidator.password(password);
    const termAndConditionsErrors = RegisterValidator.termsAndConditions(termsAndConditions);

    newHasErrors ||=
      !!userNameErrors.length ||
      !!passwordErrors.length ||
      !!emailErrors.length ||
      !!termAndConditionsErrors.length ||
      !!countryErrors.length;

    newErrors.userName = userNameErrors;
    newErrors.email = emailErrors;
    newErrors.country = countryErrors;
    newErrors.password = passwordErrors;
    newErrors.termsAndConditions = termAndConditionsErrors;

    setErrors(newErrors);
    setHasErrors(newHasErrors);
  }, [username, password, email, country, termsAndConditions]);

  return [hasErrors, errors];
};
