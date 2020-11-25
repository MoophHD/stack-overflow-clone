import styled from "styled-components";
import Avatar from "components/shared/Avatar";
import VoteBlock from "./VoteBlock";

const Question = ({
  author,
  score,
  title,
  text,
  onUpvote,
  onDownvote,
  isMyUpvote,
}) => (
  <Container>
    <Left>
      <VoteBlock
        isUpvoted={isMyUpvote}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        score={score}
      />
    </Left>

    <Right>
      <Title>{title}</Title>
      <Description>{text}</Description>
      <UserBlock>
        <Avatar initials={`${author.firstName[0]}${author.lastName[0]}`} />
        <UserCol>
          <Name>{`${author.firstName} ${author.lastName}`}</Name>
          <Score>score: {author.score}</Score>
        </UserCol>
      </UserBlock>
    </Right>
  </Container>
);

const Container = styled.div`
  display: flex;

  border-radius: var(--br);
  background-color: white;
  padding: 1.5rem;
  box-shadow: var(--bs-main);
`;

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 1.5rem;
`;

const Right = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  margin: 1.5rem 0 1rem;
  word-break: break-word;
`;

const Name = styled.span``;

const Score = styled.span`
  color: var(--color-text-gray);
  align-self: flex-end;
  font-size: var(--fs-small);
`;

const UserBlock = styled.div`
  align-self: flex-end;
  display: flex;
`;

const UserCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Question;
