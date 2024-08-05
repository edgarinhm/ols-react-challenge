import { useEffect, useState } from "react";
import { UserFieldsModel } from "./initial-data";
import { UserValidator } from "common/validators/user-validator";

export type UserErrors = {
  [Property in keyof typeof UserValidator]?: string[];
};

export const useUserValidator = (
  user: UserFieldsModel,
  technologies: string
): ValidationResult<UserErrors> => {
  const { name, lastName, rol, area } = user;
  const [errors, setErrors] = useState<UserErrors>({});
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    let newHasErrors = false;
    const newErrors: UserErrors = {};

    const nameErrors = UserValidator.name(name);
    const lastNameErrors = UserValidator.lastName(lastName);
    const rolErrors = UserValidator.rol(rol);
    const technologiesErrors = UserValidator.technologies(technologies);
    const divisionErrors = UserValidator.division(area);

    newHasErrors ||=
      !!nameErrors.length ||
      !!lastNameErrors.length ||
      !!rolErrors.length ||
      !!technologiesErrors.length ||
      !!divisionErrors.length;

    newErrors.name = nameErrors;
    newErrors.lastName = lastNameErrors;
    newErrors.rol = rolErrors;
    newErrors.technologies = technologiesErrors;
    newErrors.division = divisionErrors;

    setErrors(newErrors);
    setHasErrors(newHasErrors);
  }, [area, technologies, lastName, name, rol]);

  return [hasErrors, errors];
};
