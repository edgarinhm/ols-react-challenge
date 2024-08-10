import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./user-modal.module.scss";
import { useId, useState } from "react";
import { Spinner } from "common/components/spinner/spinner";
import UserForm from "../user-form/user-form";
import { userFields, UserFieldsModel } from "../user-form/initial-data";
import { UserModel } from "common/models/user/user-model";
import { CreateUser } from "common/services/user-service";
import { MapCreateUserRequest } from "common/helpers/user-mapper";

interface UserModalProps {
  open: boolean;
  title: string;
  userId?: number;
  onClose: () => void;
  OnSubmit: (
    validForm: boolean,
    newUser: {
      userFormFields: UserFieldsModel;
    }
  ) => Promise<void>;
}

const UserModal = ({ open, title, onClose, OnSubmit }: UserModalProps): JSX.Element => {
  const id = useId();
  const [userFormFields, setUserFormFields] = useState<UserFieldsModel>(userFields);
  const [technologyFormFields, setTechnologyFormFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const modalId = `header-${id}`;

  const onUserFormChange = (name: string, value: string): void => {
    setUserFormFields((state) => ({ ...state, [name]: value }));
  };

  const handleTechnologySelect = (value: string): void => {
    const index = technologyFormFields.indexOf(value);
    if (index > -1) {
      const technologyUpdated = technologyFormFields.filter((technology) => technology !== value);
      setTechnologyFormFields(technologyUpdated);
    } else {
      setTechnologyFormFields((state) => [...state, value]);
    }
  };

  const handleClose = (): void => {
    onClose();
    setUserFormFields(userFields);
    setTechnologyFormFields([]);
  };

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
          <UserForm
            userFields={userFormFields}
            onUserFormChange={onUserFormChange}
            onSubmit={OnSubmit}
            onClose={handleClose}
            tecnologiesFields={technologyFormFields}
            onTechnologyChange={handleTechnologySelect}
          />
        </div>
      </Modal>
      <Spinner show={isLoading} text={"...Loading User"} />
    </>
  );
};

interface CreateUserModalProps {
  open: boolean;
  updateGrid: (createdUser: UserModel) => void;
  onClose: () => void;
}

export const CreateUserModal = ({
  open,
  updateGrid,
  onClose,
}: CreateUserModalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (
    validForm: boolean,
    newUser: {
      userFormFields: UserFieldsModel;
    }
  ): Promise<void> => {
    if (validForm) {
      setIsLoading(true);
      try {
        const User = MapCreateUserRequest(newUser.userFormFields);
        const createdUser = await CreateUser(User);
        updateGrid(createdUser);
        onClose();
      } catch (error) {
        console.log("CreateUserModal-Error");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserModal
        open={open}
        title={Messages.CreateUserModalTitle}
        onClose={onClose}
        OnSubmit={handleSubmit}
      />
      <Spinner show={isLoading} text={"...Creating User"} />
    </>
  );
};

export default UserModal;
