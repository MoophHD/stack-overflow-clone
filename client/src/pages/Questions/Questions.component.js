import styled from "styled-components";
import { connect } from "react-redux";
import {
  getQuestions,
  searchQuestion,
} from "../../redux/questions/questions.actions";
import { useEffect } from "react";
import QuestionCard from "../../components/QuestionCard/QuestionCard.component";
import SearchBar from "./component/SearchBar.component";

const Questions = ({ questions, getQuestions, searchQuestion }) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      await getQuestions();
    };

    fetchQuestions();
  }, [getQuestions]);

  return (
    <Wrapper>
      <SearchBar onSubmit={searchQuestion} />
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2% 2rem;
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

export default connect(mapStateToProps, { getQuestions, searchQuestion })(
  Questions
);
