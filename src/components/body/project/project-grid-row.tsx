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

const Row = ({
  value,
  style,
}: {
  value: string | number | boolean;
  style: CSSProperties | undefined;
}): JSX.Element => {
  return (
    <div className={`${tableStyles.column}`} style={style}>
      <div className={tableStyles.content}>
        <span>{value}</span>
      </div>
    </div>
  );
};

const CustomRowValue = ({
  style,
  children,
}: {
  style: CSSProperties | undefined;
  children: ReactNode;
}): JSX.Element => {
  return (
    <div className={`${tableStyles.column}`} style={style}>
      <div className={tableStyles.content}>{children}</div>
    </div>
  );
};

const Actions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}): JSX.Element => {
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
