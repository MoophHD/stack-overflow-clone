import styled from "styled-components";
import Post from "components/shared/Post";

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
          <Post
            score={answer.score}
            title={answer.title}
            text={answer.text}
            firstName={answer.author.firstName}
            lastName={answer.author.lastName}
            userScore={answer.author.score}
            userId={answer.author._id}
            isUpvotedByMe={answer.votes.find((v) => v.user === userId)}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            isBest={bestAnswer === answer._id}
            canMark={canMark}
            onMarkBest={() => markAnswerBest(answer._id)}
          />

          // <Answer
          //   canMark={canMark}
          //   onMarkBest={() => markAnswerBest(answer._id)}
          //   key={`a${answer._id}`}
          //   onUpvote={() => onUpvote(answer._id)}
          //   onDownvote={() => onDownvote(answer._id)}
          //   userId={userId}
          //   votes={answer.votes}
          //   score={answer.score}
          //   author={answer.author}
          //   id={answer._id}
          //   text={answer.text}
          //   isBest={bestAnswer === answer._id}
          // />
        )
    )}
  </Container>
);

const Container = styled.div`
  margin-bottom: 2rem;
`;

export default AnswerList;
