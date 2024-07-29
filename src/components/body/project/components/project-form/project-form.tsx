import { Messages } from "common/constants/messages-constants";
import styles from "./project-form.module.scss";
import { FormControl } from "common/components/form-control/form-control";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";
import { useId, useMemo, useState } from "react";
import { FloatingLabelSelect } from "common/components/form-control/floating-label-select/floating-label-select";

const ProjectForm = () => {
  const id = useId();
  const [isBackendSelectOpen, setIsBackendSelectOpen] = useState(false);
  const [isFrontendSelectOpen, setIsFrontendSelectOpen] = useState(false);

  const [backendTechnology, setBackendTechnology] = useState<BackendTechnologyType[]>([]);
  const [frontendTechnology, setFrontendTechnology] = useState<FrontendTechnologyType[]>([]);

  const backendSelectValue = useMemo(
    (): string => backendTechnology?.join(", "),
    [backendTechnology]
  );
  const frontendSelectValue = useMemo(
    (): string => frontendTechnology?.join(", "),
    [frontendTechnology]
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
        <label htmlFor="frontend">{Messages.AddProjectModalFormFrontend}</label>
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
            className={styles.dropdown}
            role="combobox"
            aria-expanded={isFrontendSelectOpen}
            aria-haspopup="listbox"
            aria-labelledby="frontend-multiple-checkbox-label frontend-multiple-checkbox"
            id={`${id}-frontend-multiple-checkbox`}
          >
            <ul className={styles.dropdownOptions}>
              <li
                className={`${styles.dropdownOption} ${styles.disabled}`}
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
                  className={`${styles.dropdownOption} ${frontendSelectValue.indexOf(frontend) > -1 ? styles.selected : ""}`}
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
        <label htmlFor="backend">{Messages.AddProjectModalFormBackend}</label>
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
            className={styles.dropdown}
            role="combobox"
            aria-expanded={isBackendSelectOpen}
            aria-haspopup="listbox"
            aria-labelledby="backend-multiple-checkbox-label backend-multiple-checkbox"
            id={`${id}-backend-multiple-checkbox`}
          >
            <ul className={styles.dropdownOptions}>
              <li
                className={`${styles.dropdownOption} ${styles.disabled}`}
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
                  className={`${styles.dropdownOption} ${backendSelectValue.indexOf(backend) > -1 ? styles.selected : ""}`}
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
        <FormControl.Input type="text" label={Messages.AddProjectModalFormDatabases} />
      </div>
    </>
  );
};

export default ProjectForm;
