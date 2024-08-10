import dropdownStyles from "common/sass/modules/dropdown.module.scss";
import { Messages } from "common/constants/messages-constants";
import styles from "./project-form.module.scss";
import { FormControl } from "common/components/form-control/form-control";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { useEffect, useId, useMemo, useState } from "react";
import { FloatingLabelSelect } from "common/components/form-control/floating-label-select/floating-label-select";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";
import { useProjectValidator } from "./use-project-validator";
import { DevelopersFieldsModel, ProjectFieldsModel, TechnologyFieldsModel } from "./initial-data";
import { Modal } from "common/components/modal/modal";
import { GetAllUsers } from "common/services/user-service";

const ProjectForm = ({
  projectFields,
  tecnologiesFields,
  developersFields,
  onProjectFormChange,
  onSubmit,
  onClose,
  onFrontendChange,
  onDatabaseChange,
  onBackendChange,
  onDeveloperChange,
}: {
  projectFields: ProjectFieldsModel;
  tecnologiesFields: TechnologyFieldsModel;
  developersFields: DevelopersFieldsModel;
  onProjectFormChange: (name: string, value: string) => void;
  onSubmit: (
    validForm: boolean,
    newProject: {
      projectFormFields: ProjectFieldsModel;
    }
  ) => Promise<void>;
  onClose: () => void;
  onFrontendChange: (value: FrontendTechnologyType) => void;
  onDatabaseChange: (value: DatabaseTechnologyType) => void;
  onBackendChange: (value: BackendTechnologyType) => void;
  onDeveloperChange: (value: string) => void;
}) => {
  const id = useId();
  const [isBackendSelectOpen, setIsBackendSelectOpen] = useState(false);
  const [isFrontendSelectOpen, setIsFrontendSelectOpen] = useState(false);
  const [isDatabaseSelectOpen, setIsDatabaseSelectOpen] = useState(false);
  const [isDevloperSelectOpen, setIsDevepolerSelectOpen] = useState(false);
  const [developerOptions, setDeveloperOptions] = useState<DevelopersFieldsModel>();
  const [submitted, setSubmitted] = useState(false);

  const backendSelectValue = useMemo(
    (): string => tecnologiesFields.backend?.join(", "),
    [tecnologiesFields.backend]
  );
  const frontendSelectValue = useMemo(
    (): string => tecnologiesFields.frontend?.join(", "),
    [tecnologiesFields.frontend]
  );
  const databseSelectValue = useMemo(
    (): string => tecnologiesFields.database?.join(", "),
    [tecnologiesFields.database]
  );

  const developerSelectValue = useMemo(
    (): string => developersFields?.join(", "),
    [developersFields]
  );

  const [hasError, errors] = useProjectValidator(
    projectFields,
    frontendSelectValue,
    backendSelectValue,
    databseSelectValue,
    developerSelectValue
  );

  useEffect(() => {
    const loadUsers = async () => {
      const users = await GetAllUsers();
      setDeveloperOptions(users.map((user) => `${user.name} ${user.lastName}`));
    };
    loadUsers();
  }, []);

  const handleSubmit = async (): Promise<void> => {
    setSubmitted(true);
    await onSubmit(!hasError, {
      projectFormFields: {
        ...projectFields,
        developers: developerSelectValue,
        frontend: frontendSelectValue,
        backend: backendSelectValue,
        database: databseSelectValue,
      },
    });
    handleCancel();
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
          id={`${id}-project-name`}
          type="text"
          label={Messages.AddProjectModalFormProject}
          value={projectFields.projectName}
          onChange={(event) => onProjectFormChange("projectName", event.target.value)}
          errors={errors.projectName}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <FormControl.Input
          id={`${id}-client`}
          type="text"
          label={Messages.AddProjectModalFormClient}
          value={projectFields.client}
          onChange={(event) => onProjectFormChange("client", event.target.value)}
          errors={errors.client}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <FormControl.Input
          id={`${id}-repository`}
          type="text"
          label={Messages.AddProjectModalFormRepository}
          value={projectFields.repoUrl}
          placeholder={"https://"}
          onChange={(event) => onProjectFormChange("repoUrl", event.target.value)}
          errors={errors.repository}
          showErrors={submitted}
        />
      </div>
      <div className={styles.row}>
        <FormControl.CheckInput
          id={`${id}-ci`}
          type="checkbox"
          label={Messages.AddProjectModalFormCI}
          checked={projectFields.ci === "true"}
          onChange={(event) => onProjectFormChange("ci", `${event.target.checked}`)}
        />
      </div>
      <div className={styles.row}>
        <FormControl.CheckInput
          id={`${id}-cd`}
          type="checkbox"
          label={Messages.AddProjectModalFormCD}
          checked={projectFields.cd === "true"}
          onChange={(event) => onProjectFormChange("cd", `${event.target.checked}`)}
        />
      </div>
      <div className={styles.row}>
        <div
          aria-labelledby="developers-multiple-checkbox-label"
          className={dropdownStyles.dropdownLabel}
        >
          {Messages.AddProjectModalFormDevelopers}
        </div>
        <FloatingLabelSelect
          id={`${id}-developers`}
          open={isDevloperSelectOpen}
          onClose={() => setIsDevepolerSelectOpen(false)}
          onTogglePopover={() => setIsDevepolerSelectOpen((state) => !state)}
          value={developerSelectValue}
          errors={errors.developers}
          showErrors={submitted}
          testId={`developers-select`}
          placeholder={Messages.ProjectModalFormDeveloperPlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isFrontendSelectOpen}
            aria-haspopup="listbox"
            id={`${id}-developers-multiple-checkbox`}
          >
            <ul className={dropdownStyles.dropdownOptions}>
              <li
                className={`${dropdownStyles.dropdownOption} ${dropdownStyles.disabled}`}
                tabIndex={0}
                data-value={Messages.ProjectModalFormDeveloperPlaceholder}
                role="option"
              >
                <em>{Messages.ProjectModalFormDeveloperPlaceholder}</em>
              </li>
              {developerOptions?.map((developer) => (
                <li
                  tabIndex={-1}
                  role="option"
                  data-value={developer}
                  aria-selected={developerSelectValue.indexOf(developer) > -1}
                  key={developer}
                  className={`${dropdownStyles.dropdownOption} ${developerSelectValue.indexOf(developer) > -1 ? dropdownStyles.selected : ""}`}
                  onClick={() => onDeveloperChange(developer)}
                >
                  {developer}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <div
          aria-labelledby="frontend-multiple-checkbox-label"
          className={dropdownStyles.dropdownLabel}
        >
          {Messages.AddProjectModalFormFrontend}
        </div>
        <FloatingLabelSelect
          id={`${id}-frontend`}
          open={isFrontendSelectOpen}
          onClose={() => setIsFrontendSelectOpen(false)}
          onTogglePopover={() => setIsFrontendSelectOpen((state) => !state)}
          value={frontendSelectValue}
          errors={errors.frontend}
          showErrors={submitted}
          testId={`frontend-select`}
          placeholder={Messages.ProjectModalFormFrontendPlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isFrontendSelectOpen}
            aria-haspopup="listbox"
            id={`${id}-frontend-multiple-checkbox`}
          >
            <ul className={dropdownStyles.dropdownOptions}>
              <li
                className={`${dropdownStyles.dropdownOption} ${dropdownStyles.disabled}`}
                tabIndex={0}
                data-value={Messages.ProjectModalFormFrontendPlaceholder}
                role="option"
              >
                <em>{Messages.ProjectModalFormFrontendPlaceholder}</em>
              </li>
              {Object.values(FrontendTechnologyType).map((frontend) => (
                <li
                  tabIndex={-1}
                  role="option"
                  data-value={frontend}
                  aria-selected={frontendSelectValue.indexOf(frontend) > -1}
                  key={frontend}
                  className={`${dropdownStyles.dropdownOption} ${frontendSelectValue.indexOf(frontend) > -1 ? dropdownStyles.selected : ""}`}
                  onClick={() => onFrontendChange(frontend)}
                >
                  {frontend}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <div
          aria-labelledby="backend-multiple-checkbox-label"
          className={dropdownStyles.dropdownLabel}
        >
          {Messages.AddProjectModalFormBackend}
        </div>
        <FloatingLabelSelect
          id={`${id}-backend`}
          open={isBackendSelectOpen}
          onClose={() => setIsBackendSelectOpen(false)}
          onTogglePopover={() => setIsBackendSelectOpen((state) => !state)}
          value={backendSelectValue}
          errors={errors.backend}
          showErrors={submitted}
          testId={`backend-select`}
          placeholder={Messages.ProjectModalFormBackendPlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isBackendSelectOpen}
            aria-haspopup="listbox"
            id={`${id}-backend-multiple-checkbox`}
          >
            <ul className={dropdownStyles.dropdownOptions}>
              <li
                className={`${dropdownStyles.dropdownOption} ${dropdownStyles.disabled}`}
                tabIndex={0}
                data-value={Messages.ProjectModalFormBackendPlaceholder}
                role="option"
              >
                <em>{Messages.ProjectModalFormBackendPlaceholder}</em>
              </li>
              {Object.values(BackendTechnologyType).map((backend) => (
                <li
                  tabIndex={-1}
                  role="option"
                  data-value={backend}
                  aria-selected={backendSelectValue.indexOf(backend) > -1}
                  key={backend}
                  className={`${dropdownStyles.dropdownOption} ${backendSelectValue.indexOf(backend) > -1 ? dropdownStyles.selected : ""}`}
                  onClick={() => onBackendChange(backend)}
                >
                  {backend}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <div
          aria-labelledby="database-multiple-checkbox-label"
          className={dropdownStyles.dropdownLabel}
        >
          {Messages.AddProjectModalFormDatabases}
        </div>
        <FloatingLabelSelect
          id={`${id}-database`}
          open={isDatabaseSelectOpen}
          onClose={() => setIsDatabaseSelectOpen(false)}
          onTogglePopover={() => setIsDatabaseSelectOpen((state) => !state)}
          value={databseSelectValue}
          errors={errors.database}
          showErrors={submitted}
          testId={`database-select`}
          placeholder={Messages.ProjectModalFormDatabasePlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isDatabaseSelectOpen}
            aria-haspopup="listbox"
            id={`${id}-database-multiple-checkbox`}
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
              {Object.values(DatabaseTechnologyType).map((database) => (
                <li
                  tabIndex={-1}
                  role="option"
                  data-value={database}
                  aria-selected={databseSelectValue.indexOf(database) > -1}
                  key={database}
                  className={`${dropdownStyles.dropdownOption} ${backendSelectValue.indexOf(database) > -1 ? dropdownStyles.selected : ""}`}
                  onClick={() => onDatabaseChange(database)}
                >
                  {database}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
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

export default ProjectForm;
