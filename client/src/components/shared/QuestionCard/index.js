import styled, { css } from "styled-components";
import InfoBlocks from "./InfoBlocks";
import AuthorRow from "./Author";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const QuestionCard = ({
  id,
  authorName,
  authorId,
  title,
  answerCount,
  score,
  isClosed,
  slim = false,
  colored = false,
}) => {
  const history = useHistory();
  const handleOnClick = useCallback(
    (e) => {
      if (e.target.tagName !== "A") {
        history.push(`/questions/${id}`);
      }
    },
    [history, id]
  );
  return (
    <Container
      tabIndex={0}
      onClick={handleOnClick}
      slim={slim}
      colored={colored}
    >
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
};

const Container = styled.div`
  display: flex;
  justify-items: space-between;
  align-items: stretch;
  border-radius: var(--br);
  background-color: white;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  width: 100%;
  box-shadow: var(--bs-main);

  transition: box-shadow 0.15s ease-in-out;
  &:hover,
  &:focus {
    box-shadow: var(--bs-large);
  }

  ${(props) =>
    props.colored &&
    css`
      background-color: var(--color-plain);
    `};

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
  font-size: var(--fs-large);
  margin: 0;

  ${(props) =>
    props.slim &&
    css`
      font-size: var(--fs-small);
      font-weight: normal;
    `}
`;

const AuthorContainer = styled.div`
  align-self: flex-end;
`;

export default QuestionCard;
