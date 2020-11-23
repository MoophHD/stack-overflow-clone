import styled from "styled-components";
import VoteBlock from "../VoteBlock/VoteBlock.component";
import Avatar from "../../../../components/Avatar/Avatar.component";
import { useEffect, useState } from "react";

const Answer = ({ userId, votes, onUpvote, onDownvote, text, score, author }) => {
  const [isMyUpvote, setIsMyUpvote] = useState(null);

  useEffect(() => {
    if (userId && votes?.length > 0) {
      const myVote = votes.find((v) => v.user === userId);

      if (myVote) return setIsMyUpvote(myVote.vote === 1);
    }
    setIsMyUpvote(null);
  }, [userId, votes]);

  return (
    <Container>
      <Left>
        <VoteBlock isUpvoted={isMyUpvote} score={score} onUpvote={onUpvote} onDownvote={onDownvote} />
      </Left>

      <Right>
        <Description>{text}</Description>
        <UserBlock>
          <Avatar>{`${author.firstName[0]}${author.lastName[0]}`}</Avatar>
          <UserCol>
            <Name>{`${author.firstName} ${author.lastName}`}</Name>
            <Score>score: {author.score}</Score>
          </UserCol>
        </UserBlock>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: var(--bs-main);
  display: flex;
  border-radius: var(--br);
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  word-break: break-word;
  flex: 1;
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

export default Answer;
