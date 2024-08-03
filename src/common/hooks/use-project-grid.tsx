import tableStyles from "common/sass/modules/table.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatter } from "common/formatters/formatters";
import {
  GetProjectCiCdStatusClass,
  GetProjectAlertStatusClass,
} from "common/functions/status-functions";
import { GetCiCdIconClass } from "common/functions/table-functions";
import { ProjectModel } from "common/models/project-model";
import { CSSProperties } from "react";
import { GetProjectStatusType } from "common/enums/project-status-type";
import { GetProjecStatusBadgeClass } from "common/functions/badge-classes";

export const useProjectGrid = () => {
  const pipeRowValueFormetter = (
    row: ProjectModel,
    rowName: StringValueKeys<ProjectModel>
  ): JSX.Element[] | "" => {
    const rowValue = row[rowName];
    return ["developers", "frontendTecnology", "databases"].includes(rowName)
      ? formatter.replacePipeToNewHtmlLine(rowValue).map((value, index) => (
          <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
            <span>{value}</span>
          </div>
        ))
      : "";
  };

  const periodRowValueFormatter = (
    row: ProjectModel,
    rowName: StringValueKeys<ProjectModel>
  ): JSX.Element[] | "" => {
    const rowValue = row[rowName];
    return ["backendTecnology"].includes(rowName)
      ? formatter.replacePeriodToNewHtmlLine(rowValue).map((value, index) => (
          <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
            <span>{value}</span>
          </div>
        ))
      : "";
  };

  const ciCdRowValueFormatter = (
    row: ProjectModel,
    rowName: BooleanValueKeys<ProjectModel>
  ): JSX.Element | "" => {
    const rowValue = row[rowName];
    return ["ci", "cd"].includes(rowName) ? (
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

  const alertTextColorRowFormatter = (
    row: ProjectModel,
    rowName: NumberValueKeys<ProjectModel>
  ): JSX.Element | "" => {
    const rowValue = row[rowName];
    return [
      "deployCount",
      "errorsCount",
      "reportNc",
      "warningCount",
      "percentageCompletion",
    ].includes(rowName) ? (
      <div className={tableStyles.status} style={{ width: "auto" }}>
        <span className={`${tableStyles[GetProjectAlertStatusClass(rowName)]}`}>
          {rowName === "percentageCompletion" ? formatter.percentageUnit(rowValue, 1) : rowValue}
        </span>
      </div>
    ) : (
      ""
    );
  };

  const statusRowFormatter = (
    row: ProjectModel,
    rowName: StringValueKeys<ProjectModel>
  ): JSX.Element | "" => {
    const rowValue = row[rowName];
    return "status".includes(rowName) ? (
      <span
        className={`${[GetProjecStatusBadgeClass(GetProjectStatusType(rowValue))]}`}
        style={{ textTransform: "capitalize", color: "black", fontWeight: "normal" }}
      >
        {rowValue}
      </span>
    ) : (
      ""
    );
  };

  const headers = [
    {
      name: "projectName" as never,
      label: "proyecto",
      isSortable: true,
      style: {
        minWidth: "230px",
      } as CSSProperties,
    },
    {
      name: "client" as never,
      label: "cliente",
      style: {
        minWidth: "280px",
      },
    },
    {
      name: "repoUrl" as never,
      label: "repositorio",
      style: {
        minWidth: "170px",
      },
    },
    {
      name: "developers" as never,
      label: "desarrolladores",
      style: {
        minWidth: "230px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      rowFormatter: pipeRowValueFormetter,
    },
    {
      name: "ci" as never,
      label: "ci",
      style: {
        minWidth: "40px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: ciCdRowValueFormatter,
    },
    {
      name: "cd" as never,
      label: "cd",
      style: {
        minWidth: "50px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: ciCdRowValueFormatter,
    },
    {
      name: "frontendTecnology" as never,
      label: "frontend",
      style: {
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        textAlign: "left",
      } as CSSProperties,
      rowFormatter: pipeRowValueFormetter,
    },
    {
      name: "backendTecnology" as never,
      label: "backend",
      style: {
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      rowFormatter: periodRowValueFormatter,
    },
    {
      name: "databases" as never,
      label: "db",
      style: {
        minWidth: "150px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      } as CSSProperties,
      rowFormatter: pipeRowValueFormetter,
    },
    {
      name: "warningCount" as never,
      label: "alertas",
      style: {
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: alertTextColorRowFormatter,
    },
    {
      name: "errorsCount" as never,
      label: "errores",
      style: {
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: alertTextColorRowFormatter,
    },
    {
      name: "deployCount" as never,
      label: "cant. despliegues",
      style: {
        minWidth: "120px",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: alertTextColorRowFormatter,
    },
    {
      name: "percentageCompletion" as never,
      label: "avance",
      style: {
        minWidth: "60px",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: alertTextColorRowFormatter,
    },
    {
      name: "reportNc" as never,
      label: "reporte NC's",
      style: {
        minWidth: "100px",
        textAlign: "center",
      } as CSSProperties,
      rowFormatter: alertTextColorRowFormatter,
    },
    {
      name: "status" as never,
      label: "status",
      style: {
        minWidth: "120px",
      } as CSSProperties,
      rowFormatter: statusRowFormatter,
    },
  ];

  return {
    headers,
  };
};
