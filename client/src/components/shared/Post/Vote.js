import styled, { css } from "styled-components";
import { Button } from "components/shared/lib";

const Vote = ({ score, onUpvote, onDownvote, isUpvoted }) => (
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
  margin: 0.2rem 0;
  font-size: var(--fs-large);
  font-weight: bold;
`;

const VoteButton = styled(Button)`
  padding: 0.25rem;
  font-size: var(--fs-large);
  background-color: var(--color-plain);

  &:hover,
  &:focus {
    box-shadow: none;
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      color: white;
    `};
`;

const UpButton = styled(VoteButton)`
  &:hover,
  &:focus {
    background-color: var(--color-main);
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-main);
    `};
`;

const DownButton = styled(VoteButton)`
  &:hover,
  &:focus {
    background-color: var(--color-danger);
  }

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-danger);
    `};
`;

export default Vote;
