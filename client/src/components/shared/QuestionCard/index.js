import styled from "styled-components";
import QuestionStats from "./QuestionStats";
import CreatedInfo from "./CreatedInfo";
import { Container, StyledLink, Heading } from "components/shared/lib";
import Tag from "components/shared/Tag";
import { tablet } from "constants/screenBreakpoints";

const QuestionCard = ({
  id,
  authorName,
  authorId,
  title,
  answerCount,
  score,
  isClosed,
  createdAt,
  tags,
  dark = false,
  onTagClick,
}) => {
  return (
    <CardContainer dark={dark}>
      <QuestionStats
        answerCount={answerCount}
        score={score}
        isClosed={isClosed}
      />

      <ContentContainer>
        <TitleLink to={`/question/${id}`}>
          <Heading>{title}</Heading>
        </TitleLink>

        <InfoBottom>
          <TagContainer>
            {tags?.length > 0 &&
              tags.map((tag, i) => (
                <Tag
                  onClick={() => {
                    if (onTagClick) onTagClick(tag);
                  }}
                  key={`${tag}${i}`}
                  light
                >
                  {tag}
                </Tag>
              ))}
          </TagContainer>
          <CreatedInfo createdAt={createdAt} name={authorName} id={authorId} />
        </InfoBottom>
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

  @media (max-width: ${tablet}px) {
    flex-direction: column;
  }
`;

const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const TagContainer = styled.div``;

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
