import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./add-project-modal.module.scss";
import { useId, useState } from "react";
import ProjectForm from "../project-form/project-form";
import {
  projectFields,
  technologyFields,
  TechnologyFieldsModel,
} from "../project-form/initial-data";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ open, onClose }: AddProjectModalProps) => {
  const id = useId();
  const [projectFormFields, setProjectFormFields] = useState(projectFields);
  const [tecnologiesFormFields, setTecnologiesFormFields] =
    useState<TechnologyFieldsModel>(technologyFields);
  const [submitted, setSubmitted] = useState(false);

  const modalId = `header-${id}`;
  const handleSubmit = (validForm: boolean): void => {
    if (validForm) {
      setSubmitted(true);
    }
  };

  const onProjectFormChange = (name: string, value: string): void => {
    setProjectFormFields((state) => ({ ...state, [name]: value }));
  };

  const handleFrontendSelect = (value: FrontendTechnologyType): void => {
    const index = tecnologiesFormFields.frontend.indexOf(value);
    if (index > -1) {
      const technologyUpdated = tecnologiesFormFields.frontend.filter(
        (technology) => technology !== value
      );
      setTecnologiesFormFields((state) => ({
        ...state,
        frontend: technologyUpdated,
      }));
    } else {
      setTecnologiesFormFields((state) => ({
        ...state,
        frontend: [...state.frontend, value],
      }));
    }
  };

  const handleBackendSelect = (value: BackendTechnologyType): void => {
    const index = tecnologiesFormFields.backend.indexOf(value);
    if (index > -1) {
      const technologyUpdated = tecnologiesFormFields.backend.filter(
        (technology) => technology !== value
      );
      setTecnologiesFormFields((state) => ({
        ...state,
        backend: technologyUpdated,
      }));
    } else {
      setTecnologiesFormFields((state) => ({
        ...state,
        backend: [...state.backend, value],
      }));
    }
  };

  const handleDatabaseSelect = (value: DatabaseTechnologyType): void => {
    const index = tecnologiesFormFields.database.indexOf(value);
    if (index > -1) {
      const technologyUpdated = tecnologiesFormFields.database.filter(
        (technology) => technology !== value
      );
      setTecnologiesFormFields((state) => ({
        ...state,
        database: technologyUpdated,
      }));
    } else {
      setTecnologiesFormFields((state) => ({
        ...state,
        database: [...state.database, value],
      }));
    }
  };

  const handleClose = (): void => {
    onClose();
    setSubmitted(false);
    setProjectFormFields(projectFields);
    setTecnologiesFormFields(technologyFields);
  };

  return (
    <Modal open={open} ariaLabelledBy={modalId} onClose={handleClose} allowEscape={true}>
      <Modal.Header
        title={Messages.AddProjectModalTitle}
        onClose={handleClose}
        showIconCloseText={false}
        showCloseButton={true}
      />

      <div className={styles.modalForm}>
        <ProjectForm
          submitted={submitted}
          projectFields={projectFormFields}
          onProjectFormChange={onProjectFormChange}
          handleSubmit={handleSubmit}
          onClose={handleClose}
          onFrontendChange={handleFrontendSelect}
          onDatabaseChange={handleDatabaseSelect}
          onBackendChage={handleBackendSelect}
          tecnologiesFields={tecnologiesFormFields}
        />
      </div>
    </Modal>
  );
};

export default AddProjectModal;
