import styled from "styled-components";
import QuestionCard from "../../../../components/QuestionCard/QuestionCard.component";
import { Link } from "react-router-dom";

const Questions = ({ questions }) => (
  <Container>
    <Title>Questions </Title>

    {questions.map((question) => (
      <QuestionContainer
        to={`/question/${question._id}`}
        key={`${question._id}`}
      >
        <QuestionCard
          colored
          title={question.title}
          answerCount={question.answers.length}
          isClosed={!!question.bestAnswer}
          score={question.score}
        />
      </QuestionContainer>
    ))}
  </Container>
);

const Container = styled.div``;
const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
`;

const QuestionContainer = styled(Link)`
  margin-bottom: 1rem;
  text-decoration: none;
  display: block;
  color: var(--color-text-dark);
`;

export default Questions;
