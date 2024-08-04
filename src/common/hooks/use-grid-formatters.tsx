import tableStyles from "common/sass/modules/table.module.scss";
import { formatter } from "common/formatters/formatters";
import { ReactNode } from "react";

export const useGridFormatters = (): {
  pipeRowValueFormatter: (rowValue: string) => JSX.Element[];
  periodRowValueFormatter: (rowValue: string) => JSX.Element[];
  alertTextColorRowFormatter: (rowValue: ReactNode, statusClass: string) => JSX.Element;
  customStyleClassRowFormatter: (rowValue: ReactNode, styleClass: string) => JSX.Element;
} => {
  return {
    pipeRowValueFormatter: (rowValue: string): JSX.Element[] => {
      return formatter.replacePipeToNewHtmlLine(rowValue).map((value, index) => (
        <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
          <span>{value}</span>
        </div>
      ));
    },
    periodRowValueFormatter: (rowValue: string): JSX.Element[] => {
      return formatter.replacePeriodToNewHtmlLine(rowValue).map((value, index) => (
        <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
          <span>{value}</span>
        </div>
      ));
    },
    alertTextColorRowFormatter: (rowValue: ReactNode, statusClass: string): JSX.Element => {
      return (
        <div className={tableStyles.status} style={{ width: "auto" }}>
          <span className={`${tableStyles[statusClass]}`}>{rowValue}</span>
        </div>
      );
    },
    customStyleClassRowFormatter: (rowValue: ReactNode, styleClass: string): JSX.Element => {
      return <span className={styleClass}>{rowValue}</span>;
    },
  };
};
