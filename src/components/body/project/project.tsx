import Card from "common/components/card/card";
import styles from "./project.module.scss";
import ProjectGrid from "./project-grid";
import { useEffect, useState } from "react";
import AddProjectModal from "./add-project-modal";

const Project = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  useEffect(() => {
    document.title = "OLS Project";
  }, []);

  return (
    <div className={styles.project}>
      <div className={`${styles.fullRow} ${styles.stretchCard}`}>
        <Card width="100%">
          <Card.Header title={"Lista de proyectos registrados"} />
          <div className={styles.addActionGroup}>
            <button type="submit" onClick={() => setIsAddProjectModalOpen(true)}>
              {"nuevo proyecto"}
            </button>
          </div>
          <div className={styles.tableGridResponsive}>
            <ProjectGrid />
          </div>
        </Card>
      </div>
      <AddProjectModal
        open={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
      />
    </div>
  );
};

export default Project;
