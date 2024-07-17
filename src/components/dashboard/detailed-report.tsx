import ProgressBarWithLabel from "common/components/progress-bar/progress-bar-with-label";
import styles from "./detailed-report.module.scss";
import { useDashboardStorage } from "common/state-management/dashboard-storage";
import { useMemo } from "react";
import { formatter } from "common/formatters/formatters";
import dayjs from "dayjs";

const DetailedReport = () => {
  const releaseResume = useDashboardStorage((state) => state.releaseResume);

  const cicle = useMemo(() => {
    if (releaseResume?.cicle) {
      const date = formatter.dateReverseFormat(releaseResume.cicle.replace(/\//g, ""));
      return dayjs(date).format("MMM-d YYYY");
    } else {
      return "";
    }
  }, [releaseResume?.cicle]);

  return (
    <div className={styles.detailedReport}>
      <div className={styles.header}>
        <p className={styles.title}>{"Entregas"}</p>
        <h1 className={styles.value}>{releaseResume?.porcentaje}</h1>
        <h3 className={styles.subTitle}>
          {"Proximo Ciclo: "}
          {cicle}
        </h3>
        <p className={styles.description}>
          {
            "El ciclo de entrega se calcula usando las fechas estimadas de los Sprints en cada proyecto."
          }
        </p>
      </div>
      <div className={styles.body}>
        {releaseResume?.topProjects.map((project) => {
          return (
            <ProgressBarWithLabel
              key={project.name}
              currentValue={Number(project.porcentaje)}
              label={project.name}
              maxValue={100}
              unit={"%"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DetailedReport;
