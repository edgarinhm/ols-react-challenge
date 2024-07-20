import CommitsReport from "./commit-report";
import ServerReport from "./server-report";
import styles from "./reports.module.scss";
import DetailedReport from "./detailed-report";

const Reports = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={`${styles.row}`}>
        <div className={styles.twoReportsInRow}>
          <ServerReport />
          <CommitsReport />
        </div>
      </div>

      <div className={styles.row}>
        <DetailedReport />
      </div>
    </div>
  );
};

export default Reports;
