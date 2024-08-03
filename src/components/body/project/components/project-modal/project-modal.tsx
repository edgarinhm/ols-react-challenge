import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./project-modal.module.scss";
import { useEffect, useId, useState } from "react";
import ProjectForm from "../project-form/project-form";
import {
  developersFields,
  DevelopersFieldsModel,
  projectFields,
  ProjectFieldsModel,
  technologyFields,
  TechnologyFieldsModel,
} from "../project-form/initial-data";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { ProjectModel } from "common/models/project-model";
import { MapProject, MapProjectFields } from "common/helpers/project-mapper";
import { CreateProject, GetProjectById, UpdateProject } from "common/services/project-service";
import { Spinner } from "common/components/spinner/spinner";

interface ProjectModalProps {
  open: boolean;
  title: string;
  projectId?: number;
  onClose: () => void;
  OnSubmit: (
    validForm: boolean,
    newProject: {
      projectFormFields: ProjectFieldsModel;
    }
  ) => Promise<void>;
}

const ProjectModal = ({
  open,
  title,
  projectId,
  onClose,
  OnSubmit,
}: ProjectModalProps): JSX.Element => {
  const id = useId();
  const [projectFormFields, setProjectFormFields] = useState<ProjectFieldsModel>(projectFields);
  const [technologiesFormFields, setTechnologiesFormFields] =
    useState<TechnologyFieldsModel>(technologyFields);
  const [developersFormFields, setDevelopersFormFields] =
    useState<DevelopersFieldsModel>(developersFields);

  const [isLoading, setIsLoading] = useState(false);

  const modalId = `header-${id}`;

  const onProjectFormChange = (name: string, value: string): void => {
    setProjectFormFields((state) => ({ ...state, [name]: value }));
  };

  const handleFrontendSelect = (value: FrontendTechnologyType): void => {
    const index = technologiesFormFields.frontend.indexOf(value);
    if (index > -1) {
      const technologyUpdated = technologiesFormFields.frontend.filter(
        (technology) => technology !== value
      );
      setTechnologiesFormFields((state) => ({
        ...state,
        frontend: technologyUpdated,
      }));
    } else {
      setTechnologiesFormFields((state) => ({
        ...state,
        frontend: [...state.frontend, value],
      }));
    }
  };

  const handleBackendSelect = (value: BackendTechnologyType): void => {
    const index = technologiesFormFields.backend.indexOf(value);
    if (index > -1) {
      const technologyUpdated = technologiesFormFields.backend.filter(
        (technology) => technology !== value
      );
      setTechnologiesFormFields((state) => ({
        ...state,
        backend: technologyUpdated,
      }));
    } else {
      setTechnologiesFormFields((state) => ({
        ...state,
        backend: [...state.backend, value],
      }));
    }
  };

  const handleDatabaseSelect = (value: DatabaseTechnologyType): void => {
    const index = technologiesFormFields.database.indexOf(value);
    if (index > -1) {
      const technologyUpdated = technologiesFormFields.database.filter(
        (technology) => technology !== value
      );
      setTechnologiesFormFields((state) => ({
        ...state,
        database: technologyUpdated,
      }));
    } else {
      setTechnologiesFormFields((state) => ({
        ...state,
        database: [...state.database, value],
      }));
    }
  };

  const handleDeveloperSelect = (value: string): void => {
    const index = developersFormFields.indexOf(value);
    if (index > -1) {
      const developerUpdated = developersFormFields.filter(
        (developerUpdated) => developerUpdated !== value
      );
      setDevelopersFormFields(developerUpdated);
    } else {
      setDevelopersFormFields((state) => [...state, value]);
    }
  };

  const handleClose = (): void => {
    onClose();
    setProjectFormFields(projectFields);
    setTechnologiesFormFields(technologyFields);
  };

  useEffect(() => {
    const loadProjectsData = async (projectId: number): Promise<void> => {
      setIsLoading(true);
      try {
        const project = await GetProjectById(projectId);
        const projectFormFields = MapProjectFields(project);

        setProjectFormFields(projectFormFields);
        setTechnologiesFormFields({
          database: project.databases.split("|") as DatabaseTechnologyType[],
          frontend: project.frontendTecnology.split("|") as FrontendTechnologyType[],
          backend: project.backendTecnology.split(",") as BackendTechnologyType[],
        });
        setDevelopersFormFields(project.developers.split("|"));
      } catch (error) {
        console.log("loadProjectsData-Error");
      }
      setIsLoading(false);
    };

    if (open && projectId) {
      loadProjectsData(projectId);
    }
  }, [open, projectId]);

  return (
    <>
      <Modal open={open} ariaLabelledBy={modalId} onClose={handleClose} allowEscape={true}>
        <Modal.Header
          title={title}
          onClose={handleClose}
          showIconCloseText={false}
          showCloseButton={true}
        />

        <div className={styles.modalForm}>
          <ProjectForm
            projectFields={projectFormFields}
            onProjectFormChange={onProjectFormChange}
            onSubmit={OnSubmit}
            onClose={handleClose}
            onFrontendChange={handleFrontendSelect}
            onDatabaseChange={handleDatabaseSelect}
            onBackendChange={handleBackendSelect}
            tecnologiesFields={technologiesFormFields}
            developersFields={developersFormFields}
            onDeveloperChange={handleDeveloperSelect}
          />
        </div>
      </Modal>
      <Spinner show={isLoading} text={"...Loading Project"} />
    </>
  );
};

interface ProjectCreateModalProps {
  open: boolean;
  updateGrid: (createdProject: ProjectModel) => void;
  onClose: () => void;
}

export const ProjectCreateModal = ({
  open,
  updateGrid,
  onClose,
}: ProjectCreateModalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (
    validForm: boolean,
    newProject: {
      projectFormFields: ProjectFieldsModel;
    }
  ): Promise<void> => {
    if (validForm) {
      setIsLoading(true);
      try {
        const project = MapProject(newProject.projectFormFields);
        const createdProject = await CreateProject(project);
        updateGrid(createdProject);
        onClose();
      } catch (error) {
        console.log("ProjectCreateModal-Error");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <ProjectModal
        open={open}
        title={Messages.AddProjectModalTitle}
        onClose={onClose}
        OnSubmit={handleSubmit}
      />
      <Spinner show={isLoading} text={"...Creating Project"} />
    </>
  );
};

interface ProjectUpdateModalProps {
  open: boolean;
  projectId?: number;
  updateGrid: (createdProject: ProjectModel) => void;
  onClose: () => void;
}

export const ProjectUpdateModal = ({
  open,
  projectId,
  updateGrid,
  onClose,
}: ProjectUpdateModalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (
    validForm: boolean,
    newProject: {
      projectFormFields: ProjectFieldsModel;
    }
  ): Promise<void> => {
    if (validForm) {
      setIsLoading(true);
      try {
        const project = MapProject(newProject.projectFormFields);
        const updatedProject = await UpdateProject(project);
        updateGrid(updatedProject);
        onClose();
      } catch (error) {
        console.log("ProjectUpdateModal-Error");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <ProjectModal
        open={open}
        title={Messages.UpdateProjectModalTitle}
        onClose={onClose}
        OnSubmit={handleSubmit}
        projectId={projectId}
      />
      <Spinner show={isLoading} text={"...Updating Project"} />
    </>
  );
};

export default ProjectModal;
