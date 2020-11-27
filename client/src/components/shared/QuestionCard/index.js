import styled from "styled-components";
import QuestionStats from "./QuestionStats";
import CreatedInfo from "./CreatedInfo";
import {
  Container,
  StyledLink,
  Heading,
  ContainerLink,
} from "components/shared/lib";
import Tag from "components/shared/Tag";

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
                <ContainerLink to={`/questions/tag/${tag}`} key={`${tag}${i}`}>
                  <Tag light>{tag}</Tag>
                </ContainerLink>
              ))}
          </TagContainer>
          <CreatedInfo createdAt={createdAt} name={authorName} id={authorId} />
        </InfoBottom>
      </ContentContainer>
    </CardContainer>
  );
};

const InfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const TagContainer = styled.div``;

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
