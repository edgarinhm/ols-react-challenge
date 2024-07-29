import dropdownStyles from "common/sass/modules/dropdown.module.scss";
import { Messages } from "common/constants/messages-constants";
import styles from "./project-form.module.scss";
import { FormControl } from "common/components/form-control/form-control";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { useId, useMemo, useState } from "react";
import { FloatingLabelSelect } from "common/components/form-control/floating-label-select/floating-label-select";
import { DatabaseTechnologyType } from "common/enums/database-technology-type";

const ProjectForm = () => {
  const id = useId();
  const [isBackendSelectOpen, setIsBackendSelectOpen] = useState(false);
  const [isFrontendSelectOpen, setIsFrontendSelectOpen] = useState(false);
  const [isDatabaseSelectOpen, setIsDatabaseSelectOpen] = useState(false);

  const [frontendTechnology, setFrontendTechnology] = useState<FrontendTechnologyType[]>([]);
  const [backendTechnology, setBackendTechnology] = useState<BackendTechnologyType[]>([]);
  const [databaseTechnology, setDatabaseTechnology] = useState<DatabaseTechnologyType[]>([]);

  const backendSelectValue = useMemo(
    (): string => backendTechnology?.join(", "),
    [backendTechnology]
  );
  const frontendSelectValue = useMemo(
    (): string => frontendTechnology?.join(", "),
    [frontendTechnology]
  );
  const databseSelectValue = useMemo(
    (): string => databaseTechnology?.join(", "),
    [databaseTechnology]
  );

  const handleBackendSelect = (value: BackendTechnologyType) => {
    const index = backendTechnology.indexOf(value);
    if (index > -1) {
      const backendTechnologyUpdated = backendTechnology.filter((backend) => backend !== value);
      setBackendTechnology(backendTechnologyUpdated);
    } else {
      setBackendTechnology((state) => {
        return [...state, value];
      });
    }
  };

  const handleFrontendSelect = (value: FrontendTechnologyType) => {
    const index = frontendTechnology.indexOf(value);
    if (index > -1) {
      const frontendTechnologyUpdated = frontendTechnology.filter((frontend) => frontend !== value);
      setFrontendTechnology(frontendTechnologyUpdated);
    } else {
      setFrontendTechnology((state) => {
        return [...state, value];
      });
    }
  };

  const handleDatabaseSelect = (value: DatabaseTechnologyType) => {
    const index = databaseTechnology.indexOf(value);
    if (index > -1) {
      const databaseTechnologyUpdated = databaseTechnology.filter((database) => database !== value);
      setDatabaseTechnology(databaseTechnologyUpdated);
    } else {
      setDatabaseTechnology((state) => {
        return [...state, value];
      });
    }
  };

  return (
    <>
      <div className={styles.row}>
        <FormControl.Input type="text" label={Messages.AddProjectModalFormLabel} />
      </div>
      <div className={styles.row}>
        <FormControl.Input type="text" label={Messages.AddProjectModalFormClient} />
      </div>
      <div className={styles.row}>
        <FormControl.Input
          type="text"
          label={Messages.AddProjectModalFormRepository}
          placeholder="https://"
        />
      </div>
      <div className={styles.row}>
        <FormControl.CheckInput type="checkbox" label={Messages.AddProjectModalFormCI} />
      </div>
      <div className={styles.row}>
        <FormControl.CheckInput type="checkbox" label={Messages.AddProjectModalFormCD} />
      </div>
      <div className={styles.row}>
        <FormControl.Input type="text" label={Messages.AddProjectModalFormDevelopers} />
      </div>
      <div className={styles.row}>
        <label htmlFor="frontend" className={dropdownStyles.dropdownLabel}>
          {Messages.AddProjectModalFormFrontend}
        </label>
        <FloatingLabelSelect
          open={isFrontendSelectOpen}
          onClose={() => setIsFrontendSelectOpen(false)}
          onTogglePopover={() => setIsFrontendSelectOpen((state) => !state)}
          value={frontendSelectValue}
          //error={errors.storagePackageTiers?.[index]?.storagePackageFeatures[0]}
          hasError={false}
          testId={`frontend-select`}
          placeholder={Messages.ProjectModalFormFrontendPlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isFrontendSelectOpen}
            aria-haspopup="listbox"
            aria-labelledby="frontend-multiple-checkbox-label frontend-multiple-checkbox"
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
                  onClick={() => handleFrontendSelect(frontend)}
                >
                  {frontend}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <label htmlFor="backend" className={dropdownStyles.dropdownLabel}>
          {Messages.AddProjectModalFormBackend}
        </label>
        <FloatingLabelSelect
          open={isBackendSelectOpen}
          onClose={() => setIsBackendSelectOpen(false)}
          onTogglePopover={() => setIsBackendSelectOpen((state) => !state)}
          value={backendSelectValue}
          //error={errors.storagePackageTiers?.[index]?.storagePackageFeatures[0]}
          hasError={false}
          testId={`backend-select`}
          placeholder={Messages.ProjectModalFormBackendPlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isBackendSelectOpen}
            aria-haspopup="listbox"
            aria-labelledby="backend-multiple-checkbox-label backend-multiple-checkbox"
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
                  onClick={() => handleBackendSelect(backend)}
                >
                  {backend}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <label htmlFor="database" className={dropdownStyles.dropdownLabel}>
          {Messages.AddProjectModalFormDatabases}
        </label>
        <FloatingLabelSelect
          open={isDatabaseSelectOpen}
          onClose={() => setIsDatabaseSelectOpen(false)}
          onTogglePopover={() => setIsDatabaseSelectOpen((state) => !state)}
          value={databseSelectValue}
          //error={errors.storagePackageTiers?.[index]?.storagePackageFeatures[0]}
          hasError={false}
          testId={`database-select`}
          placeholder={Messages.ProjectModalFormDatabasePlaceholder}
        >
          <div
            className={dropdownStyles.dropdown}
            role="combobox"
            aria-expanded={isDatabaseSelectOpen}
            aria-haspopup="listbox"
            aria-labelledby="database-multiple-checkbox-label database-multiple-checkbox"
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
                  onClick={() => handleDatabaseSelect(database)}
                >
                  {database}
                </li>
              ))}
            </ul>
          </div>
        </FloatingLabelSelect>
      </div>
    </>
  );
};

export default ProjectForm;
