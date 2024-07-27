import { Messages } from "common/constants/messages-constants";
import styles from "./project-form.module.scss";
import { FormControl } from "common/components/form-control/form-control";
import { FrontendTechnologyType } from "common/enums/frontend-technology-type";
import { BackendTechnologyType } from "common/enums/backend-technology-type";

const ProjectForm = () => {
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
        <FormControl.Select type="multi" label={Messages.AddProjectModalFormFrontend}>
          <FormControl.SelectOption value={"Que tecnología frontend se usa"} />
          {Object.values(FrontendTechnologyType).map((frontend) => (
            <FormControl.SelectOption value={frontend} key={frontend} />
          ))}
        </FormControl.Select>
      </div>
      <div className={styles.row}>
        <FormControl.Select multiple label={Messages.AddProjectModalFormBackend}>
          <FormControl.SelectOption value={"Que tecnología backend se usa"} />
          {Object.values(BackendTechnologyType).map((backend) => (
            <FormControl.SelectOption value={backend} key={backend} />
          ))}
        </FormControl.Select>
      </div>
      <div className={styles.row}>
        <FormControl.Input type="text" label={Messages.AddProjectModalFormDatabases} />
      </div>
    </>
  );
};

export default ProjectForm;
