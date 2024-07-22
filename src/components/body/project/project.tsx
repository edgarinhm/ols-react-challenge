import Card from "common/components/card/card";
import styles from "./project.module.scss";
import ProjectGrid from "./project-grid";

const Project = () => {
  const handleCreateNewProject = (): void => {};
  return (
    <div className={styles.project}>
      <div className={`${styles.fullRow} ${styles.stretchCard}`}>
        <Card width="100%">
          <Card.Header title={"Lista de proyectos registrados"} />
          <div className={styles.addActionGroup}>
            <button type="submit" onClick={handleCreateNewProject}>
              {"nuevo proyecto"}
            </button>
          </div>
          <div className={styles.tableGridResponsive}>
            <ProjectGrid />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Project;
