import Card from "common/components/card/card";
import styles from "./user.module.scss";
import { useEffect, useState } from "react";
import { Messages } from "common/constants/messages-constants";
import UserGrid from "./components/user-grid/user-grid";

const User = () => {
  const [isCreateUuserModalOpen, setIsCreateUserModalOpen] = useState(false);

  useEffect(() => {
    document.title = "OLS user";
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.fullRow} ${styles.stretchCard}`}>
        <Card width="100%">
          <Card.Header title={Messages.UserPageTitle} />
          <div className={styles.addActionGroup}>
            <button type="submit" onClick={() => setIsCreateUserModalOpen(true)}>
              {Messages.UserPageAddButton}
            </button>
          </div>
          <div className={styles.tableGridResponsive}>
            <UserGrid
              isCreateUserModalOpen={isCreateUuserModalOpen}
              closeCreateUserModal={() => setIsCreateUserModalOpen(false)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default User;
