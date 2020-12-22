import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import QuestionCard from "components/shared/QuestionCard";
import { Button, Page, Heading } from "components/shared/lib";
import SearchBar from "./SearchBar";
import Spinner from "components/shared/Spinner";
import PagePagination from "components/shared/PagePagination";
import { StyledLink } from "components/shared/lib";
import {
  getQuestions,
  setQuestionCount,
  resetQuestions,
} from "redux/questions/questions.actions";

const searchRegex = {
  word: /^\w+$/,
  tag: /^\[.+\]$/,
};

function parseSearchInput(value) {
  const tokens = value.split(" ");
  const title = tokens.filter((token) => searchRegex.word.test(token));
  const tags = tokens
    .filter((token) => searchRegex.tag.test(token))
    .map((tag) => tag.slice(1, -1));

  return { title, tags };
}

const TYPEAHEAD_DELAY = 1000;
let typeAheadTimeout;

export const Questions = ({
  questions=[],
  getQuestions,
  loading,
  setQuestionCount,
  currentPage,
  pageCount,
  resetQuestions,
}) => {
  const [searchValue, setSearchValue] = useState("");

  function handleTagClick(tag) {
    handleSearchChange(searchValue + ` [${tag}]`);
  }

  function handleSearchChange(value) {
    setSearchValue(value);

    clearTimeout(typeAheadTimeout);
    typeAheadTimeout = setTimeout(
      () => handleSearchSubmit(value),
      TYPEAHEAD_DELAY
    );
  }

  function handleSearchSubmit(value) {
    const searchParams = parseSearchInput(value);
    getQuestions(1, searchParams);
  }

  function handlePageChange(page) {
    const searchParams = parseSearchInput(searchValue);
    getQuestions(page, searchParams);
  }

  useEffect(() => {
    getQuestions(1);

    return () => resetQuestions();
  }, [setQuestionCount, getQuestions, resetQuestions]);

  return (
    <Page>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <UiGroup>
            <SearchBar
              value={searchValue}
              setValue={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
            <StyledLink to="/ask-question">
              <AskQuestionButton primary>Ask a question</AskQuestionButton>
            </StyledLink>
          </UiGroup>

          <Container aria-label="Question list">
            {questions.length === 0 && (
              <Heading light>No questions yet...</Heading>
            )}

            {questions.length !== 0 &&
              questions.map((question) => (
                <CardWrapper key={`questionsPage_q${question._id}`}>
                  <QuestionCard
                    dark
                    id={question._id}
                    authorName={`${question.author.firstName} ${question.author.lastName}`}
                    authorId={question.author._id}
                    title={question.title}
                    answerCount={question.answers.length}
                    score={question.score}
                    isClosed={!!question.bestAnswer}
                    tags={question.tags}
                    createdAt={question.createdAt.slice(0, 10)}
                    onTagClick={handleTagClick}
                  />
                </CardWrapper>
              ))}
          </Container>

          {pageCount >= 1 && (
            <PagePagination
              page={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </Page>
  );
};

const UiGroup = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 2rem;
`;

const AskQuestionButton = styled(Button)`
  margin-left: 1rem;
`;

const Container = styled.section`
  flex: 1;
`;

const CardWrapper = styled.div`
  margin-bottom: 1rem;
  flex: 1;
`;

const mapStateToProps = (state) => ({
  questions: state.questions.questions.page,
  loading: state.questions.loading,
  questionCount: state.questions.questions.questionCount,
  pageCount: state.questions.questions.pageCount,
  currentPage: state.questions.questions.currentPage,
});

export default connect(mapStateToProps, {
  getQuestions,
  setQuestionCount,
  resetQuestions,
})(Questions);
