import { UserModel } from "common/models/user/user-model";
import { useGridFormatters } from "./use-grid-formatters";
import Avatar from "components/top-bar/avatar";
import { GetUserRoleType } from "common/enums/user-roles";
import { ProjectModel } from "common/models/project-model";
import { CSSProperties } from "react";

export type UserModelKeys = keyof UserModel;

export const useUserGrid = () => {
  const { pipeRowValueFormatter } = useGridFormatters();
  const gridFormatters = {
    pipeFormatter: (row: UserModel, rowName: UserModelKeys): JSX.Element[] | "" => {
      const rowValue = row[rowName];
      return ["list"].includes(rowName) ? pipeRowValueFormatter(`${rowValue}`) : "";
    },
    avatarFormatter: (row: UserModel, rowName: UserModelKeys): JSX.Element | "" => {
      const rowValue = row[rowName];
      return rowName === "urlPhoto" ? (
        <Avatar url={`${rowValue}`} alt={`image of user ${rowValue} ${rowValue}`} />
      ) : (
        ""
      );
    },
    rolFormatter: (row: UserModel, rowName: UserModelKeys): JSX.Element | "" => {
      const rowValue = row[rowName];
      return rowName === "rol" ? <span>{GetUserRoleType(`${rowValue}`)}</span> : "";
    },
  };

  interface HeaderTableProps {
    name: UserModelKeys;
    label: string;
    style: CSSProperties;
    isSortable?: boolean;
    rowFormatter?: (row: UserModel, rowName: UserModelKeys) => JSX.Element | JSX.Element[] | "";
  }

  const headers: HeaderTableProps[] = [
    {
      name: "urlPhoto",
      label: "",
      style: {
        minWidth: "150px",
      },
      rowFormatter: gridFormatters.avatarFormatter,
    },
    {
      name: "name",
      label: "Nombre",
      isSortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "lastName",
      label: "Apellido",
      isSortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "rol",
      label: "Rol",
      isSortable: true,
      style: {
        minWidth: "150px",
      },
      rowFormatter: gridFormatters.rolFormatter,
    },
    {
      name: "list",
      label: "Tecnologías",
      isSortable: true,
      style: {
        minWidth: "150px",
      },
      rowFormatter: gridFormatters.pipeFormatter,
    },
    {
      name: "area",
      label: "Area",
      isSortable: true,
      style: {
        minWidth: "100px",
      },
    },
  ];

  return {
    headers,
    projectGridRowFormatter: (row: UserModel, projects?: ProjectModel[]): JSX.Element[] | "" => {
      const rowValue = projects?.filter((project) =>
        project.developers.includes(`${row.name} ${row.lastName}`)
      );
      const projectNames = rowValue?.map((project) => project.projectName);
      return rowValue && projectNames ? pipeRowValueFormatter(projectNames.join("|")) : "";
    },
  };
};
