import { CSSProperties, ReactNode } from "react";
import tableStyles from "common/sass/modules/table.module.scss";
import { ProjectModel } from "common/models/project-model";
import { faPenToSquare, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProjectGridRowProps {
  row: ProjectModel;
  children: ReactNode;
  handleOnDrawerOpen?: (row: ProjectModel) => void;
}

const ProjectGridRow = ({ row, children, handleOnDrawerOpen }: ProjectGridRowProps) => {
  return (
    <div className={tableStyles.table}>
      <div className={tableStyles.row} key={row.id}>
        <div
          tabIndex={0}
          className={tableStyles.heading}
          onClick={() => {
            handleOnDrawerOpen ? handleOnDrawerOpen(row) : undefined;
          }}
          data-qa={"project-grid-row"}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

interface RowProps {
  value: ReactNode;
  style?: CSSProperties;
}

const Row = ({ value, style }: RowProps): JSX.Element => {
  return (
    <div className={`${tableStyles.column}`} style={style}>
      <div className={tableStyles.content}>
        <span>{value}</span>
      </div>
    </div>
  );
};

interface CustomRowValueProps {
  style: CSSProperties | undefined;
  children: ReactNode;
}

const CustomRowValue = ({ style, children }: CustomRowValueProps): JSX.Element => {
  return (
    <div className={`${tableStyles.column}`} style={style}>
      <div className={tableStyles.content}>{children}</div>
    </div>
  );
};

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Actions = ({ onEdit, onDelete }: ActionsProps): JSX.Element => {
  return (
    <div className={tableStyles.actions} style={{ width: 100 }}>
      <div className={tableStyles.actionsInnerContainer}>
        <FontAwesomeIcon icon={faPenToSquare} style={{ padding: "0.125rem" }} onClick={onEdit} />
        <FontAwesomeIcon icon={faEraser} style={{ padding: "0.125rem" }} onClick={onDelete} />
      </div>
    </div>
  );
};

ProjectGridRow.Row = Row;
ProjectGridRow.CustomRowValue = CustomRowValue;
ProjectGridRow.Actions = Actions;

export default ProjectGridRow;
