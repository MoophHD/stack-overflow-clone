import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import QuestionCard from "components/shared/QuestionCard";
import { Button, Page, Heading } from "components/shared/lib";
import SearchBar from "./SearchBar";
import Spinner from "components/shared/Spinner";
import {
  getQuestions,
  searchQuestion,
} from "redux/questions/questions.actions";
import { StyledLink } from "components/shared/lib";

const searchRegex = {
  word: /^\w+$/,
  tag: /^\[.+\]$/,
};

const TYPEAHEAD_DELAY = 1000;
let typeAheadTimeout;

const Questions = ({
  questions,
  getQuestions,
  searchQuestion,
  loading,
  match,
  location,
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
    const tokens = value.split(" ");

    const titleWords = tokens.filter((token) => searchRegex.word.test(token));
    const tags = tokens
      .filter((token) => searchRegex.tag.test(token))
      .map((tag) => tag.slice(1, -1));

    searchQuestion(titleWords, tags);
  }

  useEffect(() => {
    getQuestions();
  }, [match.path, location.search, getQuestions]);

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

          <Container>
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

const Container = styled.section``;

const CardWrapper = styled.div`
  margin-bottom: 1rem;
  flex: 1;
`;

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, {
  getQuestions,
  searchQuestion,
})(Questions);
