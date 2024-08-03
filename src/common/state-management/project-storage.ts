import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { produce } from "immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type ProjectStorageModel = {
  projectName: string;
  client: string;
  repoUrl: string;
  developers: string;
  ci: string;
  cd: string;
  frontend: FrontendTechnologyType[];
  backend: BackendTechnologyType[];
  database: DatabaseTechnologyType[];
  isCreateFormValid: boolean;
  isEditFormValid: boolean;
  setState: (recipe: (state: ProjectStorageModel) => void) => void;
};

export const useProjectStorage = createWithEqualityFn<ProjectStorageModel>()((set) => {
  return {
    projectName: "",
    client: "",
    repoUrl: "",
    developers: "",
    ci: "",
    cd: "",
    frontend: [],
    backend: [],
    database: [],
    isCreateFormValid: false,
    isEditFormValid: false,
    setState: (recipe) => set(produce(recipe)),
  };
}, shallow);
