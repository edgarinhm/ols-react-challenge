import CommitsReport from "./commits-report";
import ServerReport from "./server-report";
import styles from "./reports.module.scss";

const Reports = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <ServerReport />
        <CommitsReport />
      </div>
    </div>
  );
};

export default Reports;
