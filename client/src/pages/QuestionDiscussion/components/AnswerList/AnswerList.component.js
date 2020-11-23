import styled from "styled-components";
import Answer from "./Answer.component";

const AnswerList = ({ userId, answers, onUpvote, onDownvote }) => (
  <Container>
    {answers.map((answer) => (
      <Answer
        key={`a${answer._id}`}
        onUpvote={() => onUpvote(answer._id)}
        onDownvote={() => onDownvote(answer._id)}
        
        userId={userId}
        votes={answer.votes}
        score={answer.score}
        author={answer.author}
        id={answer._id}
        text={answer.text}
      />
    ))}
  </Container>
);

const Container = styled.div`
  margin: 2rem 0;
  background-color: white;
`;

export default AnswerList;
