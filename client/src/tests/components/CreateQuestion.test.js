import React from "react";
import { CreateQuestion } from "components/pages/CreateQuestion";
import { render, cleanup, fireEvent } from "@testing-library/react";

const uiText = {
  pageIdentificator: "Ask a public question",
  inputLabel: {
    title: "Title",
    description: "Description",
    tags: "Tags",
  },
  submit: "Submit your question",
};

describe("Create Question component", () => {
  it("Should render correctly", () => {
    const { getByText, getByLabelText, getByRole } = render(<CreateQuestion />);

    getByText(uiText.pageIdentificator);
    getByLabelText(uiText.inputLabel.title);
    getByLabelText(uiText.inputLabel.description);
    getByLabelText(uiText.inputLabel.tags);
    getByRole("button", { name: uiText.submit });
  });
});

describe("Create Question actions", () => {
  const mockCreateQuestion = jest.fn();

  const correctInput = {
    tags: "qwe e reqwe",
    description: "description",
    title: "Title",
  };

  const setInputValue = (input, value) => {
    fireEvent.change(input, { target: { value } });
  };

  it("Should fire createQuestions and pass correct arguments", () => {
    const { getByLabelText, getByRole } = render(
      <CreateQuestion createQuestion={mockCreateQuestion} />
    );

    setInputValue(getByLabelText(uiText.inputLabel.title), correctInput.title);
    setInputValue(getByLabelText(uiText.inputLabel.description), correctInput.description);
    setInputValue(getByLabelText(uiText.inputLabel.tags), correctInput.tags);

    const submitBtn = getByRole("button", { name: uiText.submit });
    fireEvent.click(submitBtn);

    expect(mockCreateQuestion).toHaveBeenCalledWith(
      correctInput.title,
      correctInput.description,
      correctInput.tags.split(" ")
    );
  });
});
