import tableStyles from "common/sass/modules/table.module.scss";
import { Spinner } from "common/components/spinner/spinner";
import styles from "./project.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import { ProjectModel } from "common/models/project-model";
import { GetCiCdIconClass, GetSortIconClass } from "common/functions/table-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetProjects } from "common/services/project-service";
import { GetProjectCiCdStatusClass, StatusSortOrder } from "common/functions/status-functions";
import { SortObjects } from "common/functions/sort-functions";
import ProjectGridRow from "./project-grid-row";
import { formatter } from "common/formatters/formatters";

const ProjectGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const [sortColumn, setSortColumn] = useState<keyof ProjectModel>("id");
  const [sortDescending, setSortDescending] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPipeRowValue = (rowValue: any) => {
    return typeof rowValue === "string"
      ? formatter.replacePipeToNewHtmlLine(rowValue).map((value, index) => (
          <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
            <span>{value}</span>
          </div>
        ))
      : "";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPeriodRowValue = (rowValue: any) => {
    return typeof rowValue === "string"
      ? formatter.replacePeriodToNewHtmlLine(rowValue).map((value, index) => (
          <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
            <span>{value}</span>
          </div>
        ))
      : "";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatCiCdRowValue = (rowValue: any) => {
    return typeof rowValue === "boolean" ? (
      <span className={`${tableStyles.status}`}>
        <FontAwesomeIcon
          className={`${tableStyles[GetProjectCiCdStatusClass(rowValue)]}`}
          icon={GetCiCdIconClass(rowValue)}
        />
      </span>
    ) : (
      ""
    );
  };

  const headers = [
    {
      name: "projectName",
      label: "proyecto",
      isSortable: true,
      style: {
        //flex: 2,
        // width: "20%",
        minWidth: "230px",
      } as CSSProperties,
    },
    {
      name: "client",
      label: "cliente",
      style: {
        //flex: 3,
        minWidth: "280px",
      },
    },
    {
      name: "repoUrl",
      label: "repositorio",
      style: {
        //flex: 3,
        minWidth: "170px",
      },
    },
    {
      name: "developers",
      label: "desarrolladores",
      style: {
        //  flex: 4,
        //width: "40%",
        minWidth: "230px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      format: formatPipeRowValue,
    },
    {
      name: "ci",
      label: "ci",
      style: {
        //flex: 1,
        minWidth: "40px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      } as CSSProperties,
      format: formatCiCdRowValue,
    },
    {
      name: "cd",
      label: "cd",
      style: {
        //flex: 1,
        minWidth: "50px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      } as CSSProperties,
      format: formatCiCdRowValue,
    },
    {
      name: "frontendTecnology",
      label: "frontend",
      style: {
        //flex: 3,
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        textAlign: "left",
      } as CSSProperties,
      format: formatPipeRowValue,
    },
    {
      name: "backendTecnology",
      label: "backend",
      style: {
        //flex: 1,
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      format: formatPeriodRowValue,
    },
    {
      name: "databases",
      label: "db",
      style: {
        //flex: 1,
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      format: formatPipeRowValue,
    },
    {
      name: "warningCount",
      label: "alertas",
      style: {
        //flex: 1,
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
    },
    {
      name: "errorsCount",
      label: "errores",
      style: {
        //flex: 1,
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
    },
    {
      name: "deployCount",
      label: "cant. despliegues",
      style: {
        //flex: 1,
        minWidth: "120px",
        textAlign: "center",
      } as CSSProperties,
    },
    {
      name: "percentageCompletion",
      label: "avance",
      style: {
        //flex: 1,
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
    },
    {
      name: "reportNc",
      label: "reporte NC's",
      style: {
        //flex: 1,
        minWidth: "100px",
        textAlign: "center",
      } as CSSProperties,
    },
    {
      name: "status",
      label: "status",
      style: {
        //flex: 1,
        minWidth: "120px",
      } as CSSProperties,
    },
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

  const getHeaderSortClass = (headerName: string): string => {
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
            {headers.map(({ name, label, isSortable, style }) => {
              return (
                <div
                  key={name}
                  className={`${getHeaderSortClass(name)}`}
                  style={style}
                  onClick={() => (isSortable ? toggleSort(name as keyof ProjectModel) : undefined)}
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
            <div className={tableStyles.headingActions} style={{ width: 100 }}></div>
          </div>
        </div>

        {sortedProjects.length === 0 && !isLoading && (
          <div className={tableStyles.noResultsMessage}>{"No Results Were Found"}</div>
        )}

        <div className={styles.tableBody}>
          {sortedProjects.map((row) => (
            <div key={`${row.id}${row.projectName}${row.status}`} data-qa={"projects-rows-data"}>
              <ProjectGridRow row={row}>
                {headers.map(({ name, style, format }) =>
                  format ? (
                    <ProjectGridRow.CustomRowValue key={name} style={style}>
                      {format(row[name as keyof typeof row])}
                    </ProjectGridRow.CustomRowValue>
                  ) : (
                    <ProjectGridRow.Row
                      key={name}
                      value={row[name as keyof typeof row]}
                      style={style}
                    />
                  )
                )}
                <ProjectGridRow.Actions onEdit={() => ""} onDelete={() => ""} />
              </ProjectGridRow>
            </div>
          ))}
        </div>
      </div>
      <Spinner show={isLoading} text="Loading Projects" />
    </div>
  );
};

export default ProjectGrid;
