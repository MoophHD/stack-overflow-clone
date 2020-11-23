import styled, { css } from "styled-components";
import VoteBlock from "../VoteBlock/VoteBlock.component";
import Avatar from "../../../../components/Avatar/Avatar.component";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Answer = ({
  userId,
  votes,
  onUpvote,
  onDownvote,
  text,
  score,
  author,
  isBest,
  onMarkBest,
  canMark,
}) => {
  const [isMyUpvote, setIsMyUpvote] = useState(null);

  useEffect(() => {
    if (userId && votes?.length > 0) {
      const myVote = votes.find((v) => v.user === userId);

      if (myVote) return setIsMyUpvote(myVote.vote === 1);
    }
    setIsMyUpvote(null);
  }, [userId, votes]);

  return (
    <Container isBest={isBest}>
      <Left>
        <VoteBlock
          isUpvoted={isMyUpvote}
          score={score}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
        />
        {isBest && (
          <SolvedContainer>
            <Icon />
          </SolvedContainer>
        )}

        {!isBest && canMark && (
          <MarkBestContainer onClick={onMarkBest}>
            <MarkIcon />
          </MarkBestContainer>
        )}
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

const MarkBestContainer = styled.div`
  background-color: white;
  box-shadow: var(--bs-small);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  cursor: pointer;
`;

const MarkIcon = styled(FontAwesomeIcon).attrs({
  icon: faCheck,
})`
  font-size: 1.5rem;
  color: var(--color-text-main);
`;

const SolvedContainer = styled.div`
  background-color: white;
  box-shadow: var(--bs-small);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-main);
  margin-top: 1rem;
`;

const Icon = styled(FontAwesomeIcon).attrs({
  icon: faCheck,
})`
  font-size: 1.5rem;
  color: white;
`;

const Container = styled.div`
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: var(--bs-main);
  display: flex;
  border-radius: var(--br);
  background-color: white;

  ${(props) =>
    props.isBest &&
    css`
      border: 2px solid var(--color-main);
    `}
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  word-break: break-word;
  flex: 1;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  flex-direction: column;
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
