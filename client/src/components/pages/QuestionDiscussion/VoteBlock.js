import styled, { css } from "styled-components";
import { Button } from "components/shared/lib";

const VoteBlock = ({ score, onUpvote, onDownvote, isUpvoted }) => (
  <Container>
    <UpButton active={isUpvoted === true} onClick={onUpvote}>
      ▲
    </UpButton>
    <Score>{score}</Score>
    <DownButton active={isUpvoted === false} onClick={onDownvote}>
      ▼
    </DownButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Score = styled.span`
  font-size: var(--fs-large);
  font-weight: bold;
  margin: 0.2rem 0;
`;

const VoteButton = styled(Button)`
  font-size: var(--fs-large);
  background-color: var(--color-plain);
  padding: 0.25rem;

  &:hover,
  &:focus {
    box-shadow: none;
  }
`;

const UpButton = styled(VoteButton)`
  &:hover,
  &:focus {
    background-color: var(--color-main);
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-main);
      color: white;
    `};
`;

const DownButton = styled(VoteButton)`
  &:hover,
  &:focus {
    background-color: var(--color-danger);
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-danger);
      color: white;
    `};
`;

export default VoteBlock;
