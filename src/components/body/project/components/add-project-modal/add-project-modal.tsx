import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./add-project-modal.module.scss";
import { useId } from "react";
import ProjectForm from "../project-form/project-form";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ open, onClose }: AddProjectModalProps) => {
  const id = useId();
  const modalId = `header-${id}`;
  const handleSubmit = (): void => {};

  return (
    <Modal open={open} ariaLabelledBy={modalId} onClose={onClose} allowEscape={true}>
      <Modal.Header
        title={Messages.AddProjectModalTitle}
        onClose={onClose}
        showIconCloseText={false}
        showCloseButton={true}
      />
      <form
        noValidate
        autoComplete="off"
        className={styles.modalForm}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.modalFormBody}>
          <ProjectForm />
        </div>
        <div className={styles.modalFormFooter}>
          <Modal.Footer
            onSubmit={handleSubmit}
            onCancel={onClose}
            showCancel={true}
            cancelText={Messages.AddProjectModalCancel}
            submitText={Messages.AddProjectModalSubmit}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
