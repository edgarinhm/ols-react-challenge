import Dashboard from "./dashboard";
import { render, screen } from "@testing-library/react";
import { UserData } from "common/test/mocks/user-data";
import * as sharedStorage from "common/state-management/shared-storage";

vi.spyOn(sharedStorage, "useSharedStorage").mockReturnValue(UserData.name);

describe("Dashboard", () => {
  it("should display user name when dashboard opens", async () => {
    render(<Dashboard />);
    expect(screen.getByText(UserData.name, { exact: false })).toBeInTheDocument();
  });
});
