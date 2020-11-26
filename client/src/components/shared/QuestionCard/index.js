import styled from "styled-components";
import QuestionStats from "./QuestionStats";
import CreatedInfo from "./CreatedInfo";
import { Container, StyledLink, Heading } from "components/shared/lib";

const QuestionCard = ({
  id,
  authorName,
  authorId,
  title,
  answerCount,
  score,
  isClosed,
  createdAt,
  dark = false,
}) => {
  return (
    <CardContainer dark={dark} >
      <QuestionStats
        answerCount={answerCount}
        score={score}
        isClosed={isClosed}
      />

      <ContentContainer>
        <TitleLink to={`/questions/${id}`}>
          <Heading>{title}</Heading>
        </TitleLink>

        <CreatedInfo
          createdAt={createdAt}
          name={authorName}
          id={authorId}
        />
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled(Container)`
  flex-direction: row;
  justify-items: space-between;
  align-items: stretch;
  padding: 0.75rem 1.25rem;

  transition: box-shadow 0.15s ease-in-out;
  &:hover,
  &:focus {
    box-shadow: var(--bs-large);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const TitleLink = styled(StyledLink)`
  align-self: flex-start;
`;

export default QuestionCard;
