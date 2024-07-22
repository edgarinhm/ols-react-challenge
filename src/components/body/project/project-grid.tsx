import tableStyles from "common/sass/modules/table.module.scss";
import { Spinner } from "common/components/spinner/spinner";
import styles from "./project.module.scss";
import { useEffect, useState } from "react";
import { ProjectModel } from "common/models/project-model";
import { GetSortIconClass } from "common/functions/table-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetProjects } from "common/services/project-service";
import { StatusSortOrder } from "common/functions/status-functions";
import { SortObjects } from "common/functions/sort-functions";
import ProjectGridRow from "./project-grid-row";
const ProjectGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const [sortColumn, setSortColumn] = useState<keyof ProjectModel>("id");
  const [sortDescending, setSortDescending] = useState<boolean>(true);

  const headers = [
    { name: "projectName", label: "proyecto", isSortable: true, width: "25%" },
    { name: "client", label: "cliente" },
    { name: "repoUrl", label: "repositorio" },
    { name: "developers", label: "desarrolladores" },
    { name: "ci", label: "ci" },
    { name: "cd", label: "cd" },
    { name: "frontendTecnology", label: "frontend" },
    { name: "backendTecnology", label: "backend" },
    { name: "databases", label: "db" },
    { name: "warningCount", label: "alertas" },
    { name: "errorsCount", label: "errores" },
    { name: "deployCount", label: "cant. despliegues" },
    { name: "percentageCompletion", label: "avance" },
    { name: "reportNc", label: "reporte nc's" },
    { name: "status", label: "status" },
  ];

  const isActiveSorter = (fieldName: string) => {
    return fieldName === sortColumn;
  };

  const toggleSort = (column: keyof ProjectModel): void => {
    if (isActiveSorter(column)) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(column);
      setSortDescending(false);
    }
  };

  const getHeaderClass = (headerName: string): string => {
    return isActiveSorter(headerName) ? tableStyles.activeSorter : tableStyles.sortable;
  };
  const customSortOrder = sortColumn === "status" ? StatusSortOrder : undefined;
  const sortedProjects = sortColumn
    ? SortObjects(projects, sortColumn, sortDescending, customSortOrder)
    : projects;

  useEffect(() => {
    const loadProjectsData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const projects = await GetProjects();
        setProjects(projects);
      } catch (error) {
        console.log("error");
      }
      setIsLoading(false);
    };

    loadProjectsData();
  }, []);

  return (
    <div className={styles.projectGrid}>
      <div className={tableStyles.table}>
        <div className={`${tableStyles.thead} ${styles.theadBottom} ${styles.theadLabel}`}>
          <div className={tableStyles.tr}>
            {headers.map((header) => {
              return (
                <div
                  key={header.name}
                  className={`${getHeaderClass(header.name)}`}
                  style={{ width: header.width }}
                  onClick={() =>
                    header.isSortable ? toggleSort(header.name as keyof ProjectModel) : undefined
                  }
                  data-qa={`${header.name}-sort-button`}
                >
                  <span>{header.label}</span>
                  {header.isSortable && (
                    <FontAwesomeIcon
                      icon={GetSortIconClass(isActiveSorter(header.name), !sortDescending)}
                    />
                  )}
                </div>
              );
            })}
            <div className={tableStyles.headingActions}></div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {sortedProjects.map((row) => (
            <ProjectGridRow project={row} key={`${row.id}${row.projectName}${row.status}`} />
          ))}
        </div>
      </div>
      <Spinner show={isLoading} text="Loading Projects" />
    </div>
  );
};

export default ProjectGrid;
