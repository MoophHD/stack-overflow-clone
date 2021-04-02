import React from "react";
import { Auth } from "components/pages/Auth";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestingRouter from "../utils/TestingRouter";

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

  const optional = {
    firstName: "Aaron",
    lastName: "Burr",
    nickName: "mooph",
    jobPosition: "frontend dev",
    jobExperience: "1 year",
    techStack: "mern",
  };

  const setInputValue = (labelName, value) => {
    const input = screen.getByLabelText(labelName);

    userEvent.type(input, value);
  };

  it("Should fire login function and pass login and passport data as arguments", async () => {
    const { getByRole } = render(<Auth login={mockLogin} />);

    setInputValue("Email", email.correct);
    setInputValue("Password", password.correct);

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: email.correct,
        password: password.correct,
      });
    });
  });

  it("Should not fire login on incorrect email", async () => {
    const { getByRole } = render(<Auth login={mockLogin} />);

    setInputValue("Email", email.wrongFormat);
    setInputValue("Password", password.correct);

    const submitBtn = getByRole("button", { name: "Submit" });
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it("Should fire register function and pass login and passport data as arguments", async () => {
    const { getByRole, getByText } = render(<Auth register={mockRegister} />);

    const changeModeBtn = getByText("New? Register Instead");
    userEvent.click(changeModeBtn);

    setInputValue("Email", email.correct);
    setInputValue("Password", password.correct);
    setInputValue("First Name", optional.firstName);
    setInputValue("Last Name", optional.lastName);
    setInputValue(/Nick Name/i, optional.nickName);
    setInputValue(/Current Job Position/i, optional.jobPosition);
    setInputValue(/Job Experience/i, optional.jobExperience);
    setInputValue(/Tech Stack/i, optional.techStack);

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: email.correct,
        password: password.correct,
        firstName: optional.firstName,
        lastName: optional.lastName,
        nickName: optional.nickName,
        jobPosition: optional.jobPosition,
        jobExperience: optional.jobExperience,
        techStack: optional.techStack,
      });
    });
  });
});
