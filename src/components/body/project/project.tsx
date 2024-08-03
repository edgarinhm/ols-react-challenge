import Card from "common/components/card/card";
import styles from "./project.module.scss";
import ProjectGrid from "./components/project-grid/project-grid";
import { useEffect, useState } from "react";
import { Messages } from "common/constants/messages-constants";

const Project = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  useEffect(() => {
    document.title = "OLS Project";
  }, []);

  return (
    <div className={styles.project}>
      <div className={`${styles.fullRow} ${styles.stretchCard}`}>
        <Card width="100%">
          <Card.Header title={Messages.ProjectListTitle} />
          <div className={styles.addActionGroup}>
            <button type="submit" onClick={() => setIsAddProjectModalOpen(true)}>
              {Messages.ProjectListAddButton}
            </button>
          </div>
          <div className={styles.tableGridResponsive}>
            <ProjectGrid
              isProjectCreateModalOpen={isAddProjectModalOpen}
              closeProjectCreateModal={() => setIsAddProjectModalOpen(false)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Project;
