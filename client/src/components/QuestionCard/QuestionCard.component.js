import styled from "styled-components";
import InfoBlocks from "./components/InfoBlocks.component";
import AuthorRow from "./components/Author.component";

const QuestionCard = ({
  authorName,
  authorId = "123",
  title,
  answerCount,
  score,
  isClosed,
  slim = false,
}) => (
  <Container>
    <InfoBlocks answerCount={answerCount} score={score} isClosed={isClosed} />

    <ContentContainer>
      <Title>{title}</Title>

      <AuthorContainer>
        {!slim && <AuthorRow name={authorName} id={authorId} />}
      </AuthorContainer>
    </ContentContainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-items: space-between;
  align-items: stretch;
  border-radius: 0.35rem;
  background-color: white;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  min-width: 35rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.15rem;
  margin: 0;
`;

const AuthorContainer = styled.div`
  align-self: flex-end;
`;

export default QuestionCard;
