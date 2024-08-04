import tableStyles from "common/sass/modules/table.module.scss";
import { Spinner } from "common/components/spinner/spinner";
import styles from "./user-grid.module.scss";
import { useCallback, useEffect, useState } from "react";
import { GetSortIconClass } from "common/functions/table-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusSortOrder } from "common/functions/status-functions";
import { SortObjects } from "common/functions/sort-functions";
import { UserModel } from "common/models/user/user-model";
import { GetAllUsers, RemoveUser } from "common/services/user-service";
import UserGridRow from "./user-grid-row";
import { UserModelKeys, useUserGrid } from "common/hooks/use-user-grid";
import { ProjectModel } from "common/models/project-model";
import { GetProjects } from "common/services/project-service";

interface UserGridProps {
  isCreateUserModalOpen: boolean;
  closeCreateUserModal: () => void;
}

const UserGrid = ({ isCreateUserModalOpen, closeCreateUserModal }: UserGridProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setusers] = useState<UserModel[]>([]);
  const [sortColumn, setSortColumn] = useState<UserModelKeys>("id");
  const [sortDescending, setSortDescending] = useState<boolean>(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>();

  const [projects, setProjects] = useState<ProjectModel[]>();

  console.log(isCreateUserModalOpen, isUpdateModalOpen, currentUserId, closeCreateUserModal);

  const { headers, projectGridRowFormatter } = useUserGrid();

  const isActiveSorter = (fieldName: string) => {
    return fieldName === sortColumn;
  };

  const toggleSort = (column: UserModelKeys): void => {
    if (isActiveSorter(column)) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(column);
      setSortDescending(false);
    }
  };

  const getHeaderSortClass = (headerName: string): string => {
    return isActiveSorter(headerName) ? tableStyles.activeSorter : tableStyles.sortable;
  };

  const customSortOrder = sortColumn === "name" ? StatusSortOrder : undefined;

  const sortedusers = sortColumn
    ? SortObjects(users, sortColumn, sortDescending, customSortOrder)
    : users;

  const loadUsersData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const users = await GetAllUsers();
      setusers(users);
    } catch (error) {
      console.log("error");
    }
    setIsLoading(false);
  }, []);

  const removeuser = async (userId: number) => {
    try {
      await RemoveUser(userId);
      loadUsersData();
    } catch (error) {
      console.log("removeuser-Error");
    }
  };

  const handleUpdateModal = (userId: number): void => {
    setCurrentUserId(userId);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    loadUsersData();
  }, [loadUsersData]);

  useEffect(() => {
    const loadProjectsData = async (): Promise<void> => {
      try {
        const projects = await GetProjects();
        setProjects(projects);
      } catch (error) {
        console.log("GetProjects-error");
      }
    };
    loadProjectsData();
  }, []);

  return (
    <div className={styles.userGrid}>
      <div className={tableStyles.table}>
        <div className={`${tableStyles.thead} ${styles.theadBottom} ${styles.theadLabel}`}>
          <div className={tableStyles.tr}>
            {headers.map(({ name, label, isSortable, style }) => {
              return (
                <div
                  key={name}
                  className={`${getHeaderSortClass(name)}`}
                  style={style}
                  onClick={() => (isSortable ? toggleSort(name as UserModelKeys) : undefined)}
                  data-qa={`${name}-sort-button`}
                >
                  <span>{label}</span>
                  {isSortable && (
                    <FontAwesomeIcon
                      icon={GetSortIconClass(isActiveSorter(name), !sortDescending)}
                    />
                  )}
                </div>
              );
            })}
            <div
              key={"projects"}
              style={{ minWidth: "150px" }}
              data-qa={`${"projects"}-sort-button`}
            >
              <span>{"Proyectos"}</span>
            </div>
            <div className={tableStyles.headingActions} style={{ width: 100 }}></div>
          </div>
        </div>

        {sortedusers.length === 0 && !isLoading && (
          <div className={tableStyles.noResultsMessage}>{"No Results Were Found"}</div>
        )}

        <div className={styles.tableBody}>
          {sortedusers.map((row) => (
            <UserGridRow key={`${row.id}-grid-row`} row={row} getKey={(row) => `${row.id}-user`}>
              {headers.map(({ name, style, rowFormatter }) =>
                rowFormatter ? (
                  <UserGridRow.CustomRowValue key={name} style={style}>
                    {rowFormatter(row, name)}
                  </UserGridRow.CustomRowValue>
                ) : (
                  <UserGridRow.Row key={name} value={row[name]} style={style} />
                )
              )}
              <UserGridRow.Row
                value={projectGridRowFormatter(row, projects)}
                style={{ minWidth: "150px" }}
              />
              <UserGridRow.Actions
                onEdit={() => handleUpdateModal(row.id)}
                onDelete={() => removeuser(row.id)}
              />
            </UserGridRow>
          ))}
        </div>
      </div>
      <Spinner show={isLoading} text={"...Loading Users"} />
    </div>
  );
};

export default UserGrid;
