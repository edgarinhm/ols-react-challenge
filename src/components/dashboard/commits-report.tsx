import styles from "./server-report.module.scss";
const CommitsReport = () => {
  <div className={styles.commitsReport}>
    <p>{"Reporte De Commits"}</p>
    <p>
      {
        "Total de commits realizados por cada mes diferenciando entre los tag de Ajustes(fix) y Caracteristicas(feat)"
      }
    </p>
    <div className={styles.chartContainer}></div>
  </div>;
};

export default CommitsReport;
