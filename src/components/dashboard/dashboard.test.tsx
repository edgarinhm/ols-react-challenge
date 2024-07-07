import Dashboard from "./dashboard";
import { render, screen } from "@testing-library/react";
import { UserData } from "common/test/mocks/user-data";
import * as sharedStorage from "common/state-management/shared-storage";
import * as dashboardStorage from "common/state-management/dashboard-storage";
import * as topBarStorage from "common/state-management/top-bar-storage";
import * as DashboardService from "common/services/dashboard-service.ts";
import { CardsData, DashboardServerReportData } from "common/test/mocks/dashboard-data";

const mockSetDashboardState = vi.fn();

vi.spyOn(sharedStorage, "useSharedStorage").mockReturnValue(UserData.name);
vi.spyOn(dashboardStorage, "useDashboardStorage").mockReturnValue({
  setDashboardState: mockSetDashboardState,
  cards: {},
  serverReport: {},
});
vi.spyOn(topBarStorage, "useTopBarStorage").mockReturnValue({ notifications: [] });

vi.spyOn(DashboardService, "GetDashboardCards").mockImplementation(() =>
  Promise.resolve(CardsData)
);

vi.spyOn(DashboardService, "GetDashboardServerReport").mockImplementation(() =>
  Promise.resolve(DashboardServerReportData)
);

describe("Dashboard", () => {
  it("should display user name when dashboard opens", async () => {
    render(<Dashboard />);
    expect(screen.getByText(UserData.name, { exact: false })).toBeInTheDocument();
  });
});
