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
  const [backendTechnology, setBackendTechnology] = useState<BackendTechnologyType[]>([]);

  const backendSelectValue = useMemo(
    (): string => backendTechnology?.join(", "),
    [backendTechnology]
  );

  const handleBackendSelect = (value: BackendTechnologyType) => {
    const index = backendTechnology.findIndex((backend) => backend === value);

    if (index !== -1) {
      const backendTechnologyUpdated = backendTechnology.filter((backend) => backend !== value);
      setBackendTechnology(backendTechnologyUpdated);
    } else {
      setBackendTechnology((state) => {
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
        <FormControl.Select label={Messages.AddProjectModalFormFrontend}>
          <FormControl.SelectOption value={Messages.ProjectModalFormFrontendPlaceholder} />
          {Object.values(FrontendTechnologyType).map((frontend) => (
            <FormControl.SelectOption key={frontend} label={frontend} value={frontend} />
          ))}
        </FormControl.Select>
      </div>
      <div className={styles.row}>
        <FloatingLabelSelect
          open={isBackendSelectOpen}
          onClose={() => setIsBackendSelectOpen(false)}
          onTogglePopover={() => setIsBackendSelectOpen((state) => !state)}
          value={backendSelectValue}
          //error={errors.storagePackageTiers?.[index]?.storagePackageFeatures[0]}
          hasError={false}
          testId={`backend-select`}
          label={Messages.AddProjectModalFormBackend}
        >
          <ul className={styles.dropdownOptions}>
            {Object.values(BackendTechnologyType).map((backend) => (
              <li
                key={backend}
                className={`${styles.dropdownOption} ${backendSelectValue.indexOf(backend) > -1 ? "selected" : ""}`}
                onClick={() => handleBackendSelect(backend)}
              >
                {backend}
              </li>
            ))}
          </ul>
        </FloatingLabelSelect>
      </div>
      <div className={styles.row}>
        <FormControl.Input type="text" label={Messages.AddProjectModalFormDatabases} />
      </div>
    </>
  );
};

export default ProjectForm;
