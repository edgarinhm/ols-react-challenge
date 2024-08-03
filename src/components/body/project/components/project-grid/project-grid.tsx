import tableStyles from "common/sass/modules/table.module.scss";
import { Spinner } from "common/components/spinner/spinner";
import styles from "./project-grid.module.scss";
import { useCallback, useEffect, useState } from "react";
import { ProjectModel } from "common/models/project-model";
import { GetSortIconClass } from "common/functions/table-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetProjects, RemoveProject } from "common/services/project-service";
import { StatusSortOrder } from "common/functions/status-functions";
import { SortObjects } from "common/functions/sort-functions";
import ProjectGridRow from "./project-grid-row";
import { useProjectGrid } from "common/hooks/use-project-grid";
import { ProjectCreateModal, ProjectUpdateModal } from "../project-modal/project-modal";

type KeysProject = keyof ProjectModel;

const ProjectGrid = ({
  isProjectCreateModalOpen,
  closeProjectCreateModal,
}: {
  isProjectCreateModalOpen: boolean;
  closeProjectCreateModal: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const [sortColumn, setSortColumn] = useState<KeysProject>("id");
  const [sortDescending, setSortDescending] = useState<boolean>(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<number>();

  const { headers } = useProjectGrid();

  const isActiveSorter = (fieldName: string) => {
    return fieldName === sortColumn;
  };

  const toggleSort = (column: KeysProject): void => {
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

  const loadProjectsData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const projects = await GetProjects();
      setProjects(projects);
    } catch (error) {
      console.log("error");
    }
    setIsLoading(false);
  }, []);

  const updateGrid = (currentProject: ProjectModel) => {
    const project = projects.find((project) => project.id === currentProject.id);

    if (!project) {
      return loadProjectsData();
    }
    const currentCopy = projects.filter((datum) => datum.id !== project.id);
    currentCopy.push(currentProject);
    setProjects(currentCopy);
  };

  const removeProject = async (projectId: number) => {
    try {
      await RemoveProject(projectId);
      loadProjectsData();
    } catch (error) {
      console.log("removeProject-Error");
    }
  };

  const handleUpdateModal = (projectId: number): void => {
    setCurrentProjectId(projectId);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = (): void => {
    setCurrentProjectId(undefined);
    setIsUpdateModalOpen(false);
  };

  useEffect(() => {
    loadProjectsData();
  }, [loadProjectsData]);

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
                  onClick={() => (isSortable ? toggleSort(name as KeysProject) : undefined)}
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
                {headers.map(({ name, style, rowFormatter }) =>
                  rowFormatter ? (
                    <ProjectGridRow.CustomRowValue key={name} style={style}>
                      {rowFormatter(row, name)}
                    </ProjectGridRow.CustomRowValue>
                  ) : (
                    <ProjectGridRow.Row key={name} value={row[name]} style={style} />
                  )
                )}
                <ProjectGridRow.Actions
                  onEdit={() => handleUpdateModal(row.id)}
                  onDelete={() => removeProject(row.id)}
                />
              </ProjectGridRow>
            </div>
          ))}
        </div>
      </div>
      <Spinner show={isLoading} text="Loading Projects" />
      <ProjectCreateModal
        open={isProjectCreateModalOpen}
        onClose={closeProjectCreateModal}
        updateGrid={updateGrid}
      />
      <ProjectUpdateModal
        open={isUpdateModalOpen}
        projectId={currentProjectId}
        updateGrid={updateGrid}
        onClose={handleCloseUpdateModal}
      />
    </div>
  );
};

export default ProjectGrid;
