import styled, { css } from "styled-components";

const QuestionStats = ({ score, isClosed, answerCount, slim }) => (
  <BlockContainer>
    <Block>
      <BlockCount>{score}</BlockCount>
      <BlockText>score</BlockText>
    </Block>
    <Block success={isClosed}>
      <BlockCount>{answerCount}</BlockCount>
      <BlockText>answers</BlockText>
    </Block>
  </BlockContainer>
);

const BlockContainer = styled.div`
  display: flex;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid transparent;
  border-color: transparent;
  color: var(--color-text-gray);
  border-radius: var(--br);
  padding: 0.6rem 0.35rem;
  margin-right: 1rem;

  ${(props) =>
    props.slim &&
    css`
      padding: 0 0.5rem;
      border-color: var(--color-gray);
      margin-right: 0.5rem;
    `}

  ${(props) =>
    props.success &&
    css`
      border-color: var(--color-main);
      color: var(--color-main);
    `}
`;

const BlockCount = styled.span`
  margin-bottom: 0.5rem;

  ${(props) =>
    props.slim &&
    css`
      margin-bottom: 0.1rem;
    `}

  font-weight: bold;
`;

const BlockText = styled.span`
  font-size: var(--fs-small);
`;

export default QuestionStats;