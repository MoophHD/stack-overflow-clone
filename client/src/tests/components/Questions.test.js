import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, browserHistory } from "react-router-dom";
import { Questions } from "../../components/pages/Questions";
import TestingRouter from "../utils/TestingRouter";

const mockGetQuestions = jest.fn();
const mockResetQuestions = jest.fn();

const questions = [
  {
    _id: "123",
    author: { firstName: "Aaron", lastName: "Burr", _id: "authorId" },
    answers: [],
    tags: ["qwe", "zxc"],
    isClosed: false,
    score: 1,
    title: "1 How Do I Connect To Phone Companies?",
    text:
      "I want to build an app like Twilio but I don't know where to start. I'...",
    createdAt: "2020-11-27T18:28:24.431+00:00",
  },
  {
    _id: "124",
    author: { firstName: "Aaron", lastName: "Burr", _id: "authorId" },
    answers: [],
    tags: ["qwe", "zxc"],
    isClosed: false,
    score: 1,
    title: "Unique How Do I Connect To Phone Companies?",
    text:
      "I want to build an app like Twilio but I don't know where to start. I'...",
    createdAt: "2020-11-27T18:28:24.431+00:00",
  },
];

const RoutedQuestions = (props) => (
  <BrowserRouter history={browserHistory}>
    <Questions
      getQuestions={mockGetQuestions}
      resetQuestions={mockResetQuestions}
      questions={questions}
      {...props}
    />
  </BrowserRouter>
);

it("Should render the basic fields", () => {
  render(<RoutedQuestions pageCount={2} currentPage={1} />);

  expect(screen.getByRole("textbox", { name: /search/i })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /ask a question/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: /question list/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: questions[0].title })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: /pagination navigation/i })
  ).toBeInTheDocument();
});

it("Should render an explanation if there's no questions to display", () => {
  render(<RoutedQuestions questions={[]} />);

  expect(
    screen.getByRole("heading", { name: /no questions yet/i })
  ).toBeInTheDocument();
});

it("Should render spinner if loading is true", () => {
  render(<RoutedQuestions loading={true} />);

  expect(screen.getByRole("alert", { name: /loading/i })).toBeInTheDocument();
});

it("Should redirect to ask-question-page on ask-question click", () => {
  const redirectUrl = "/ask-question";
  const { container } = render(
    <TestingRouter
      ComponentWithRedirection={() => <RoutedQuestions />}
      RedirectUrl={redirectUrl}
    />
  );

  const askQuestionBtn = screen.getByRole("button", {
    name: /ask a question/i,
  });
  userEvent.click(askQuestionBtn);

  expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
});

it("Should redirect to question-discussion-page on question-heading click", () => {
  const targetQuestion = questions[0];
  const redirectUrl = `/question/${targetQuestion._id}`;

  const { container } = render(
    <TestingRouter
      ComponentWithRedirection={() => <RoutedQuestions />}
      RedirectUrl={redirectUrl}
    />
  );

  const questionHeading = screen.getByRole("heading", {
    name: targetQuestion.title,
  });
  userEvent.click(questionHeading);

  expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
});

it("Should fire getQuestions with 1st page as an argument on load", () => {
  render(<RoutedQuestions />);

  expect(mockGetQuestions).toBeCalledWith(1);
});

it("Should fire getQuestions with title on search", () => {
  render(<RoutedQuestions />);

  const inputValue = "something";
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  userEvent.type(searchInput, inputValue);

  const searchBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(searchBtn);

  expect(mockGetQuestions).toBeCalledWith(1, { title: [inputValue], tags: [] });
});

it("Should fire getQuestions with title and tags on search", () => {
  render(<RoutedQuestions />);

  const inputValue = "this that [tag1] [tag2]";
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  userEvent.type(searchInput, inputValue);

  const searchBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(searchBtn);

  expect(mockGetQuestions).toBeCalledWith(1, {
    title: ["this", "that"],
    tags: ["tag1", "tag2"],
  });
});

it("Should fire getQuestions with a number-of-page as parameter on page change", () => {
  render(<RoutedQuestions currentPage={1} pageCount={2} />);

  const pageBtn = screen.getByRole("button", { name: /goto page 2/i });
  userEvent.click(pageBtn);

  expect(mockGetQuestions).toBeCalledWith(2, { tags: [], title: [] });
});

it("Should fire getQuestions on page change and pass search params", () => {
  render(<RoutedQuestions currentPage={1} pageCount={2} />);

  const inputValue = "this that [tag1] [tag2]";
  const searchInput = screen.getByRole("textbox", { name: /search/i });
  userEvent.type(searchInput, inputValue);
  const searchBtn = screen.getByRole("button", { name: /search/i });
  userEvent.click(searchBtn);

  const pageBtn = screen.getByRole("button", { name: /goto page 2/i });
  userEvent.click(pageBtn);

  expect(mockGetQuestions).toBeCalledWith(2, {
    title: ["this", "that"],
    tags: ["tag1", "tag2"],
  });
});
