import { ProjectValidator } from "common/validators/project-validator";
import { useEffect, useState } from "react";
import { ProjectFieldsModel } from "./initial-data";

export type ProjectErrors = {
  [Property in keyof typeof ProjectValidator]?: string[];
};

export const useProjectValidator = (
  project: ProjectFieldsModel,
  frontend: string,
  backend: string,
  database: string,
  developers: string
): ValidationResult<ProjectErrors> => {
  const { projectName, client, repoUrl } = project;
  const [errors, setErrors] = useState<ProjectErrors>({});
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    let newHasErrors = false;
    const newErrors: ProjectErrors = {};

    const projectNameErrors = ProjectValidator.projectName(projectName);
    const clientErrors = ProjectValidator.client(client);
    const repoUrlErrors = ProjectValidator.repository(repoUrl);
    const developersErrors = ProjectValidator.developers(developers);
    const frontendErrors = ProjectValidator.frontend(frontend);
    const backendErrors = ProjectValidator.backend(backend);
    const databaseErrors = ProjectValidator.database(database);

    newHasErrors ||=
      !!projectNameErrors.length ||
      !!clientErrors.length ||
      !!repoUrlErrors.length ||
      !!developersErrors.length ||
      !!frontendErrors.length ||
      !!backendErrors.length ||
      !!databaseErrors.length;

    newErrors.projectName = projectNameErrors;
    newErrors.client = clientErrors;
    newErrors.repository = repoUrlErrors;
    newErrors.developers = developersErrors;
    newErrors.frontend = frontendErrors;
    newErrors.backend = backendErrors;
    newErrors.database = databaseErrors;

    setErrors(newErrors);
    setHasErrors(newHasErrors);
  }, [backend, client, database, developers, frontend, projectName, repoUrl]);

  return [hasErrors, errors];
};
