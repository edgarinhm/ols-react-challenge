import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";

export const projectFields = {
  projectName: "",
  client: "",
  repoUrl: "",
  developers: "",
  ci: "",
  cd: "",
};

export type ProjectFieldsModel = typeof projectFields;

export type TechnologyFieldsModel = {
  frontend: FrontendTechnologyType[];
  backend: BackendTechnologyType[];
  database: DatabaseTechnologyType[];
};

export const technologyFields: TechnologyFieldsModel = {
  frontend: [],
  backend: [],
  database: [],
};
