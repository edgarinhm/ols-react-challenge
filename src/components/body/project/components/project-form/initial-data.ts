import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";

export const projectFields = {
  projectName: "",
  developers: "",
  client: "",
  repoUrl: "",
  ci: "",
  cd: "",
  deployCount: "",
  errorsCount: "",
  id: "",
  percentageCompletion: "",
  reportNc: "",
  status: "",
  warningCount: "",
  frontend: "",
  backend: "",
  database: "",
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

export type DevelopersFieldsModel = string[];

export const developersFields = [];
