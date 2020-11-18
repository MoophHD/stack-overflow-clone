import styled, { css } from "styled-components";
import InfoBlocks from "./components/InfoBlocks.component";
import AuthorRow from "./components/Author.component";

const QuestionCard = ({
  authorName,
  authorId,
  title,
  answerCount,
  score,
  isClosed,
  slim = false,
}) => (
  <Container slim={slim}>
    <InfoBlocks
      slim={slim}
      answerCount={answerCount}
      score={score}
      isClosed={isClosed}
    />

    <ContentContainer>
      <Title slim={slim}>{title}</Title>

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
  cursor: pointer;
  min-width: 35rem;
  padding: 0.75rem 1.25rem;

  ${(props) =>
    props.slim &&
    css`
      padding: 0.5rem 1rem;
      align-items: center;
    `};
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

  ${(props) =>
    props.slim &&
    css`
      font-size: 0.85rem;
      font-weight: normal;
    `}
`;

const AuthorContainer = styled.div`
  align-self: flex-end;
`;

export default QuestionCard;
