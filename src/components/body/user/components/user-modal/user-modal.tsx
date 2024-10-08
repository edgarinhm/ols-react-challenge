import { Modal } from "common/components/modal/modal";
import { Messages } from "common/constants/messages-constants";
import styles from "./user-modal.module.scss";
import { useEffect, useId, useState } from "react";
import { Spinner } from "common/components/spinner/spinner";
import UserForm from "../user-form/user-form";
import { userFields, UserFieldsModel } from "../user-form/initial-data";
import { UserModel } from "common/models/user/user-model";
import { CreateUser, GetUserById, UpdateUser } from "common/services/user-service";
import {
  MapCreateUserRequest,
  MapUpdateUserRequest,
  MapUserFieldsModel,
  MapUserListFieldModel,
} from "common/helpers/user-mapper";

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

const UserModal = ({ open, title, userId, onClose, OnSubmit }: UserModalProps): JSX.Element => {
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

  useEffect(() => {
    const loadUserData = async (userId: number): Promise<void> => {
      setIsLoading(true);
      try {
        const user = await GetUserById(userId);
        setUserFormFields(MapUserFieldsModel(user));
        setTechnologyFormFields(MapUserListFieldModel(user.list));
      } catch (error) {
        console.log("loadUserData-Error");
      }
      setIsLoading(false);
    };
    if (userId) {
      loadUserData(userId);
    }
  }, [userId]);

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

interface UpdateUserModalProps {
  open: boolean;
  userId?: number;
  updateGrid: (createdUser: UserModel) => void;
  onClose: () => void;
}

export const UpdateUserModal = ({
  open,
  userId,
  updateGrid,
  onClose,
}: UpdateUserModalProps): JSX.Element => {
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
        const user = MapUpdateUserRequest(newUser.userFormFields);
        const updatedUser = await UpdateUser(user);
        updateGrid(updatedUser);
        onClose();
      } catch (error) {
        console.log("UpdatedUserModal-Error");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserModal
        open={open}
        title={Messages.UpdateUserModalTitle}
        onClose={onClose}
        OnSubmit={handleSubmit}
        userId={userId}
      />
      <Spinner show={isLoading} text={"...Updating User"} />
    </>
  );
};

export default UserModal;
