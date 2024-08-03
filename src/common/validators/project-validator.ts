export const ProjectValidator = {
  projectName: (projectName: string): string[] => {
    const errors: string[] = [];
    if (!projectName) errors.push("Project name is required");

    if (projectName.length > 50) errors.push("Project Name limited to 50 characters");

    return errors;
  },
  client: (client: string): string[] => {
    const errors: string[] = [];
    if (!client) errors.push("Client is required");

    if (client.length > 50) errors.push("Client limited to 50 characters");

    return errors;
  },
  repository: (repository: string): string[] => {
    const errors: string[] = [];
    if (!repository) errors.push("Repository is required");

    if (repository.length > 50) errors.push("Repository limited to 50 characters");

    return errors;
  },
  ci: (ci: boolean): string[] => {
    const errors: string[] = [];
    if (!ci) errors.push("Continous integration is required");

    return errors;
  },
  cd: (cd: boolean): string[] => {
    const errors: string[] = [];
    if (!cd) errors.push("Continous deployment is required");

    return errors;
  },
  developers: (developers: string): string[] => {
    const errors: string[] = [];
    if (!developers) errors.push("Developers are required");

    return errors;
  },
  frontend: (frontend: string): string[] => {
    const errors: string[] = [];
    if (!frontend) errors.push("Frontend technology is required");

    return errors;
  },
  backend: (backend: string): string[] => {
    const errors: string[] = [];
    if (!backend) errors.push("Backend technology is required");

    return errors;
  },
  database: (database: string): string[] => {
    const errors: string[] = [];
    if (!database) errors.push("Database technology is required");

    return errors;
  },
};
