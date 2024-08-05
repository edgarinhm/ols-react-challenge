import dropdownStyles from "common/sass/modules/dropdown.module.scss";
import { Messages } from "common/constants/messages-constants";
import styles from "./user-form.module.scss";
import { FormControl } from "common/components/form-control/form-control";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { useId, useMemo, useState } from "react";
import { FloatingLabelSelect } from "common/components/form-control/floating-label-select/floating-label-select";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { useUserValidator } from "./use-user-validator";
import { UserFieldsModel } from "./initial-data";
import { Modal } from "common/components/modal/modal";

const UserForm = ({
  userFields,
  tecnologiesFields,
  onUserFormChange,
  onSubmit,
  onClose,
  onTechnologyChange,
}: {
  userFields: UserFieldsModel;
  tecnologiesFields: string[];
  onUserFormChange: (name: string, value: string) => void;
  onSubmit: (
    validForm: boolean,
    newProject: {
      userFormFields: UserFieldsModel;
    }
  ) => Promise<void>;
  onClose: () => void;
  onTechnologyChange: (
    value: DatabaseTechnologyType | FrontendTechnologyType | BackendTechnologyType
  ) => void;
}) => {
  const id = useId();
  const [isTechnologySelectOpen, setIsTechnologySelectOpen] = useState(false);
  //const [technology, setTechnology] = useState<TechnologyFieldsModel>();
  const [submitted, setSubmitted] = useState(false);

  const technologySelectValue = useMemo(
    (): string => tecnologiesFields?.join(", "),
    [tecnologiesFields]
  );

  const technologyOptions = [
    ...Object.values(FrontendTechnologyType),
    ...Object.values(BackendTechnologyType),
    ...Object.values(DatabaseTechnologyType),
  ];

  const [hasError, errors] = useUserValidator(userFields, technologySelectValue);

  const handleSubmit = async (): Promise<void> => {
    setSubmitted(true);

    await onSubmit(!hasError, {
      userFormFields: {
        ...userFields,
        list: technologySelectValue.replaceAll(",", "|"),
      },
    });
  };

  const handleCancel = (): void => {
    onClose();
    setSubmitted(false);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={styles.modalForm}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.row}>
        <FormControl.Input
          id={`${id}-user-name`}
          type="text"
          label={Messages.UserModalName}
          value={userFields.name}
          onChange={(event) => onUserFormChange("name", event.target.value)}
          errors={errors.name}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <FormControl.Input
          id={`${id}-user-lastname`}
          type="text"
          label={Messages.UserModalLastName}
          value={userFields.lastName}
          onChange={(event) => onUserFormChange("lastName", event.target.value)}
          errors={errors.lastName}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <FormControl.Input
          id={`${id}-rol`}
          type="text"
          label={Messages.UserModalRole}
          value={userFields.rol}
          onChange={(event) => onUserFormChange("rol", event.target.value)}
          errors={errors.rol}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <div
          aria-labelledby="technology-multiple-checkbox-label"
          className={dropdownStyles.dropdownLabel}
        >
          {Messages.UserModalTechnology}
        </div>
        <FloatingLabelSelect
          id={`${id}-technology`}
          open={isTechnologySelectOpen}
          onClose={() => setIsTechnologySelectOpen(false)}
          onTogglePopover={() => setIsTechnologySelectOpen((state) => !state)}
          value={technologySelectValue}
          errors={errors.technologies}
          showErrors={submitted}
          testId={`technology-select`}
          placeholder={Messages.ProjectModalFormDatabasePlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isTechnologySelectOpen}
            aria-haspopup="listbox"
            id={`${id}-technology-multiple-checkbox`}
          >
            <ul className={dropdownStyles.dropdownOptions}>
              <li
                className={`${dropdownStyles.dropdownOption} ${dropdownStyles.disabled}`}
                tabIndex={0}
                data-value={Messages.ProjectModalFormDatabasePlaceholder}
                role="option"
              >
                <em>{Messages.ProjectModalFormDatabasePlaceholder}</em>
              </li>
              {technologyOptions.map((technology, index) => (
                <li
                  tabIndex={-1}
                  role="option"
                  data-value={technology}
                  aria-selected={technologySelectValue.indexOf(technology) > -1}
                  key={`${index}-${technology}`}
                  className={`${dropdownStyles.dropdownOption} ${technologySelectValue.indexOf(technology) > -1 ? dropdownStyles.selected : ""}`}
                  onClick={() => onTechnologyChange(technology)}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
        <div className={styles.row}>
          <FormControl.Input
            id={`${id}-division`}
            type="text"
            label={Messages.UserModalDivision}
            value={userFields.area}
            onChange={(event) => onUserFormChange("area", event.target.value)}
            errors={errors.division}
            showErrors={submitted}
          />
        </div>
        <div className={styles.modalFormFooter}>
          <Modal.Footer
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            showCancel={true}
            cancelText={Messages.AddProjectModalCancel}
            submitText={Messages.AddProjectModalSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default UserForm;
