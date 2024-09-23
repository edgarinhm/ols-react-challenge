import { useSharedStorage } from "common/state-management/shared-storage";
import styles from "./dashboard.module.scss";
import ActivityCard from "./activity-card";
import Weather from "./weather";
import Reports from "./reports";
import { useEffect, useState } from "react";
import { useDashboardStorage } from "common/state-management/dashboard-storage";
import {
  GetDashboardCards,
  GetDashboardReleaseResume,
  GetDashboardReportCommits,
  GetDashboardServerReport,
} from "common/services/dashboard-service";
import { Spinner } from "common/components/spinner/spinner";
import { useTopBarStorage } from "common/state-management/top-bar-storage";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const name = useSharedStorage((state) => state.user?.name);
  const { setDashboardState, cards } = useDashboardStorage((state) => ({
    cards: state.cards,
    setDashboardState: state.setState,
  }));

  const alertCount = useTopBarStorage((state) => state.notifications?.length);

  const projectsCardData = {
    title: "Proyectos Registrados",
    message: "Ultimo proyecto registrado hace 15 días",
    count: cards?.projects,
  };

  const projectsInDevCardData = {
    title: "Proyectos en Desarrollo",
    message: "Total de avance 22.00%",
    count: cards?.projectsDev,
  };

  const pendingNotificationsCardData = {
    title: "NC's sin resolver",
    message: "Última NC regisgtrada hace 1 día",
    count: cards?.pedingNc,
  };

  const errorsDeployCardData = {
    title: "Cantidad de Errores",
    message: "Último error hace 2 horas",
    count: cards?.errorsDeploy,
  };

  useEffect(() => {
    const loadDashboardCardsData = async () => {
      setIsLoading(true);
      try {
        const cards = await GetDashboardCards();
        setDashboardState((state) => {
          state.cards = cards;
        });
      } catch (error) {
        console.log("error");
      }
      setIsLoading(false);
    };

    const loadServerReportData = async () => {
      setIsLoading(true);
      try {
        const serverReport = await GetDashboardServerReport();
        setDashboardState((state) => {
          state.serverReport = serverReport;
        });
      } catch (error) {
        console.log("error");
      }
      setIsLoading(false);
    };

    const loadCommitsReportData = async () => {
      setIsLoading(true);
      try {
        const commitsReport = await GetDashboardReportCommits();
        setDashboardState((state) => {
          state.commitsReport = commitsReport;
        });
      } catch (error) {
        console.log("error");
      }
      setIsLoading(false);
    };

    const loadReleaseResumeData = async () => {
      setIsLoading(true);
      try {
        const releaseResume = await GetDashboardReleaseResume();
        setDashboardState((state) => {
          state.releaseResume = releaseResume;
        });
      } catch (error) {
        console.log("error");
      }
      setIsLoading(false);
    };

    loadDashboardCardsData();
    loadServerReportData();
    loadCommitsReportData();
    loadReleaseResumeData();
  }, [setDashboardState]);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.row}>
          <div className={styles.title}>
            <h3>{`Bienvenido ${name}`}</h3>
            <h6>
              {"Verifica tus alertas, posees "}
              <span className={styles.alertNotification}>{`${alertCount} sin leer!`}</span>
            </h6>
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.lgWidth50}>
            <Weather />
          </div>
          <div className={styles.lgWidth50}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <ActivityCard
                title={projectsCardData.title}
                bodyText={projectsCardData.message}
                count={projectsCardData.count}
                styleColor={"tale"}
              />
              <ActivityCard
                title={projectsInDevCardData.title}
                bodyText={projectsInDevCardData.message}
                count={projectsInDevCardData.count}
                styleColor={"darkBlue"}
              />
              <ActivityCard
                title={pendingNotificationsCardData.title}
                bodyText={pendingNotificationsCardData.message}
                count={pendingNotificationsCardData.count}
                styleColor={"lightBlue"}
              />
              <ActivityCard
                title={errorsDeployCardData.title}
                bodyText={errorsDeployCardData.message}
                count={errorsDeployCardData.count}
                styleColor={"lightDanger"}
              />
            </div>
          </div>
        </div>

        <Reports />
      </div>
      <Spinner show={isLoading} text={"Loading Dashboard..."} />
    </>
  );
};

export default Dashboard;
