import { useSharedStorage } from "common/state-management/shared-storage";
import styles from "./dashboard.module.scss";
import ActivityCard from "./activity-card";
import Weather from "./weather";
import Reports from "./reports";

const Dashboard = () => {
  const name = useSharedStorage((state) => state.user?.name);

  const alertCount = 3;

  const projectsCardData = {
    title: "Projectos Registrados",
    message: "Ultimo proyecto registrado hace 15 días",
    count: 50,
  };

  const projectsInDevCardData = {
    title: "Projectos en Desarrollo",
    message: "Total de avance 22.00%",
    count: 12,
  };

  const pendingNotificationsCardData = {
    title: "NC's sin resolver",
    message: "Última NC regisgtrada hace 1 día",
    count: 24,
  };

  const errorsDeployCardData = {
    title: "Cantidad de Errores",
    message: "Último error hace 2 horas",
    count: 502,
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.title}>
        <h3>{`Bienvenido ${name}`}</h3>
        <h6>
          {"Verifica tus alertas, posees "}
          <span className={styles.alertNotification}>{`${alertCount} sin leer!`}</span>
        </h6>
      </div>
      <div className={styles.weather}>
        <Weather />
      </div>
      <div className={styles.activityPanel}>
        <ActivityCard
          title={projectsCardData.title}
          bodyText={projectsCardData.message}
          count={projectsCardData.count}
          styleColor={""}
        />
        <ActivityCard
          title={projectsInDevCardData.title}
          bodyText={projectsInDevCardData.message}
          count={projectsInDevCardData.count}
          styleColor={""}
        />
        <ActivityCard
          title={pendingNotificationsCardData.title}
          bodyText={pendingNotificationsCardData.message}
          count={pendingNotificationsCardData.count}
          styleColor={""}
        />
        <ActivityCard
          title={errorsDeployCardData.title}
          bodyText={errorsDeployCardData.message}
          count={errorsDeployCardData.count}
          styleColor={""}
        />
      </div>
      <div className={styles.reports}>
        <Reports />
      </div>
    </div>
  );
};

export default Dashboard;
