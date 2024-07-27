import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./add-project-modal.module.scss";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectModal = ({ open, onClose }: AddProjectModalProps) => {
  const handleSubmit = (): void => {};
  return (
    <Modal open={open}>
      <Modal.Header
        title={Messages.AddProjectModalTitle}
        onClose={onClose}
        showIconCloseText={false}
        showCloseButton={true}
      />
      <form noValidate autoComplete="off" className={styles.modalForm} onSubmit={handleSubmit}>
        <div className={styles.modalFooter}>
          <button type="submit" className={styles.submitBtn} data-qa="submit-btn">
            {Messages.AddProjectModalSubmit}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onClose} data-qa="cancel-btn">
            {Messages.AddProjectModalCancel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
