import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./login";
import { LoginData, LoginResponseData } from "common/test/mocks/login-data";
import { UserData } from "common/test/mocks/user-data";
import * as LoginService from "common/services/login-service";
import * as UserService from "common/services/user-service";
import * as authentication from "common/authentication/authentication";

const MockValidateAuthenticateUser = vi.fn();

vi.mock("react-router-dom");
vi.spyOn(authentication, "useAuthentication").mockReturnValue({
  handleLoginRedirect: vi.fn(),
  handleAuthenticatedRedirect: vi.fn(),
  handleLogout: vi.fn(),
  validateAuthenticateUser: MockValidateAuthenticateUser,
});

vi.spyOn(LoginService, "GetSignInLogin").mockImplementation(() =>
  Promise.resolve(LoginResponseData)
);

vi.spyOn(UserService, "GetUser").mockImplementation(() => Promise.resolve([UserData]));

describe("Login", () => {
  it("should display required input texts when click submit", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const submitButton = screen.getByRole("button");

    await user.click(submitButton);
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it("should validate user credencials when form filled and click submit", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const usernameInput = screen.getByRole("textbox");
    await user.type(usernameInput, LoginData.username);
    const passwordInput = screen.getByTestId("password");
    await user.type(passwordInput, LoginData.password);
    const submitButton = screen.getByRole("button");
    await user.click(submitButton);
    expect(MockValidateAuthenticateUser).toHaveBeenCalledTimes(1);
  });
});
