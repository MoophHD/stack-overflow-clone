import styled from "styled-components";
import Answer from "./Answer.component";

const AnswerList = ({
  userId,
  answers,
  onUpvote,
  onDownvote,
  bestAnswer,
  markAnswerBest,
  canMark,
}) => (
  <Container>
    {answers.map(
      (answer) =>
        answer && (
          <Answer
            canMark={canMark}
            onMarkBest={() => markAnswerBest(answer._id)}
            key={`a${answer._id}`}
            onUpvote={() => onUpvote(answer._id)}
            onDownvote={() => onDownvote(answer._id)}
            userId={userId}
            votes={answer.votes}
            score={answer.score}
            author={answer.author}
            id={answer._id}
            text={answer.text}
            isBest={bestAnswer === answer._id}
          />
        )
    )}
  </Container>
);

const Container = styled.div`
  margin: 2rem 0;
`;

export default AnswerList;
