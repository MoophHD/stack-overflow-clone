import styled from "styled-components";

const Rating = ({ questions, answers, score }) => (
  <Container>
    <ScoreRow>
      User Score <Score>{score}</Score>
    </ScoreRow>

    <Ratings>
      <RatingWrapper>
        <RatingTitle>Questions</RatingTitle>
        <RatingValue>{questions.length}</RatingValue>
      </RatingWrapper>

      <RatingWrapper>
        <RatingTitle>Answers</RatingTitle>
        <RatingValue>{answers.length}</RatingValue>
      </RatingWrapper>

      <RatingWrapper>
        <RatingTitle>Liked Answers</RatingTitle>
        <RatingValue>{answers.filter((a) => a.score > 0).length}</RatingValue>
      </RatingWrapper>

      <RatingWrapper>
        <RatingTitle>Best Answers </RatingTitle>
        <RatingValue>{answers.filter((a) => a.isBest).length}</RatingValue>
      </RatingWrapper>
    </Ratings>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ScoreRow = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  text-align: center;
`;

const Score = styled.span`
  font-size: 1.25em;
`;

const Ratings = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const RatingWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-plain);
  border-radius: 0.35rem;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const RatingTitle = styled.span`
  margin-bottom: 0.15rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const RatingValue = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

export default Rating;
