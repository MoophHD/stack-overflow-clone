import styled from "styled-components";

const InfoBlocks = ({ score, isClosed, answerCount }) => (
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
  border-color: ${(props) =>
    props.success ? "var(--color-main)" : "transparent"};

  color: ${(props) =>
    props.success ? "var(--color-main)" : "var(--color-text-gray)"};

  border-radius: 0.35rem;

  padding: 0.6rem 0.35rem;
  margin-right: 1rem;
`;

const BlockCount = styled.span`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const BlockText = styled.span`
  font-size: 0.8rem;
`;

export default InfoBlocks;
