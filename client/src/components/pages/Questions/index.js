import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import QuestionCard from "components/shared/QuestionCard";
import { Button, Page } from "components/shared/lib";
import SearchBar from "./SearchBar";
import Spinner from "components/shared/Spinner";
import {
  getQuestions,
  searchQuestion,
} from "redux/questions/questions.actions";
import { StyledLink } from "components/shared/lib";

const Questions = ({ questions, getQuestions, searchQuestion, loading }) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      await getQuestions();
    };

    fetchQuestions();
  }, [getQuestions]);

  return (
    <Page>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <UiGroup>
            <SearchBar onSubmit={searchQuestion} />
            <StyledLink to="/ask-question">
              <AskQuestionButton primary>Ask a question</AskQuestionButton>
            </StyledLink>
          </UiGroup>

          <Container>
            {questions.length !== 0 &&
              questions.map((question) => (
                <CardWrapper key={`questionsPage_q${question._id}`}>
                  <QuestionCard
                    id={question._id}
                    authorId={question.author._id}
                    title={question.title}
                    answerCount={question.answers.length}
                    score={question.score}
                    colored={true}
                    isClosed={!!question.bestAnswer}
                    authorName={`${question.author.firstName} ${question.author.lastName}`}
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
  flex: 1;
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
