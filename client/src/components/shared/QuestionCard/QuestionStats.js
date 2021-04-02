import styled, { css } from "styled-components";
import { tablet } from "constants/screenBreakpoints";
import useWindowSize from "hooks/useWindowSize";

const QuestionStats = ({ score, isClosed, answerCount }) => {
  const { width } = useWindowSize();

  const slim = width <= tablet;
  return (
    <StatContainer>
      <Stat slim={slim}>
        <Count slim={slim}>{score}</Count>
        <Text>score</Text>
      </Stat>
      <Stat slim={slim} success={isClosed}>
        <Count slim={slim}>{answerCount}</Count>
        <Text>answers</Text>
      </Stat>
    </StatContainer>
  );
};

const StatContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const Stat = styled.div`
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
    props.success &&
    css`
      border-color: var(--color-main);
      color: var(--color-main);
    `}

  ${(props) =>
    props.slim &&
    css`
      flex-direction: row;
      align-items: baseline;
      padding: 0;
      margin-right: 0.5rem;
      font-size: var(--fs-small);
      border: none;
    `}
`;

const Count = styled.span`
  margin-bottom: 0.5rem;
  font-weight: bold;

  ${(props) =>
    props.slim &&
    css`
      margin-bottom: 0;
      margin-right: 0.25rem;
    `}
`;

const Text = styled.span`
  font-size: var(--fs-small);
`;

export default QuestionStats;
