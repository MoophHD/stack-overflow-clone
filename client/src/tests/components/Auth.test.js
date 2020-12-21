import React from "react";
import { Auth } from "components/pages/Auth";
import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import TestingRouter from "../utils/TestingRouter";

afterEach(cleanup);

describe("Auth page component", () => {
  it("Should redirect to main page if isAuthenticated", () => {
    const redirectUrl = "/";
    const isAuthenticated = true;

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => (
          <Auth isAuthenticated={isAuthenticated} />
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
  });

  it("Should render correctly in login mode", () => {
    const { getByText, getByLabelText } = render(<Auth />);

    getByText("Login");
    getByLabelText("Email");
    getByLabelText("Password");
    getByText("Submit");
    getByText("New? Register Instead");
  });

  it("Should change to register mode on btn click", () => {
    const { getByText } = render(<Auth />);
    const changeModeBtn = getByText("New? Register Instead");

    fireEvent.click(changeModeBtn);

    getByText("Register");
  });

  it("Should render correctly in register mode", () => {
    const { getByText, getByLabelText } = render(<Auth />);

    const changeModeBtn = getByText("New? Register Instead");
    fireEvent.click(changeModeBtn);

    getByText("Register");
    getByLabelText("Email");
    getByLabelText("Password");

    getByLabelText("First Name");
    getByLabelText("Last Name");

    getByLabelText("Nick Name", { exact: false });
    getByLabelText("Current Job Position", { exact: false });
    getByLabelText("Job Experience", { exact: false });
    getByLabelText("Tech Stack", { exact: false });

    getByText("Submit");
    getByText("Already a User? Login instead");
  });

  it("Should change to login mode on btn click", async () => {
    const { getByText } = render(<Auth />);
    const changeModeBtn = getByText("New? Register Instead");

    fireEvent.click(changeModeBtn);
    fireEvent.click(changeModeBtn);

    getByText("Login");
  });
});

describe("Forms action", () => {
  const mockLogin = jest.fn();
  const mockRegister = jest.fn();

  const arbitrary = {
    correct: "Qwe",
  };

  const email = {
    correct: "qwe@mail.ru",
    wrongFormat: "qweasdasd",
  };

  const password = {
    correct: "qwe123",
    tooShort: "1",
    tooLong: "a".repeat(100),
    noDigit: "qweqweqweqweqwe",
  };

  it("Should fire login function and pass login and passport data as arguments", async () => {
    const { getByLabelText, getByRole } = render(<Auth login={mockLogin} />);

    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: email.correct } });
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: password.correct } });

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    expect(mockLogin).toHaveBeenCalledWith({
      email: email.correct,
      password: password.correct,
    });
  });

  it("Should not fire login on incorrect email", async () => {
    const { getByLabelText, getByRole } = render(<Auth login={mockLogin} />);

    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: email.wrongFormat } });
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: password.correct } });

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("Should fire register function and pass login and passport data as arguments", async () => {
    const { getByLabelText, getByRole, getByText } = render(
      <Auth register={mockRegister} />
    );

    const changeModeBtn = getByText("New? Register Instead");

    fireEvent.click(changeModeBtn);

    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: email.correct } });
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: password.correct } });
    const firstNameInput = getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: arbitrary.correct } });
    const lastNameInput = getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: arbitrary.correct } });
    const nickInput = getByLabelText("Nick Name", { exact: false });
    fireEvent.change(nickInput, { target: { value: arbitrary.correct } });
    const jobInput = getByLabelText("Current Job Position", { exact: false });
    fireEvent.change(jobInput, { target: { value: arbitrary.correct } });
    const expInput = getByLabelText("Job Experience", { exact: false });
    fireEvent.change(expInput, { target: { value: arbitrary.correct } });
    const techInput = getByLabelText("Tech Stack", { exact: false });
    fireEvent.change(techInput, { target: { value: arbitrary.correct } });

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    expect(mockRegister).toHaveBeenCalledWith({
      email: email.correct,
      password: password.correct,
    });
  });
});
