import CommitsReport from "./commit-report";
import ServerReport from "./server-report";
import styles from "./reports.module.scss";
import DetailedReport from "./detailed-report";

const Reports = (): JSX.Element => {
  return (
    <>
      <div className={styles.row}>
        <div className={`${styles.stretchCard} ${styles.twoColumns} ${styles.marginColumn}`}>
          <ServerReport />
        </div>
        <div className={`${styles.stretchCard} ${styles.twoColumns} ${styles.marginColumn}`}>
          <CommitsReport />
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.stretchCard} ${styles.oneColumn} ${styles.marginColumn}`}>
          <DetailedReport />
        </div>
      </div>
    </>
  );
};

export default Reports;
