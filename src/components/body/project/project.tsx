import Card from "common/components/card/card";
import styles from "./project.module.scss";
import ProjectGrid from "./project-grid";

const Project = () => {
  const handleCreateNewProject = (): void => {};
  return (
    <div className={styles.project}>
      <Card width="100%">
        <Card.Header title={"Lista de proyectos registrados"} />
        <div className={styles.addActionGroup}>
          <button type="submit" onClick={handleCreateNewProject}>
            {"nuevo proyecto"}
          </button>
        </div>
        <div className={styles.gridContainer}>
          <ProjectGrid />
        </div>
      </Card>
    </div>
  );
};

export default Project;
