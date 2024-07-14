import CommitsReport from "./commits-report";
import ServerReport from "./server-report";

const Reports = (): JSX.Element => {
  return (
    <div>
      <ServerReport />
      <CommitsReport />
    </div>
  );
};

export default Reports;
