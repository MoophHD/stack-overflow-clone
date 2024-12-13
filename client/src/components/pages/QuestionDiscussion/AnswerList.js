import styled from "styled-components";
import Post from "components/shared/Post";

function getIsUpvotedByMe(votes, id) {
  const myVote = votes.find((v) => v.user === id)?.vote;

  if (!myVote) return null;

  return myVote === 1;
}

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
      (answer, i) =>
        answer && (
          <AnswerPost
            key={`${answer._id} at ${i}`}
            score={answer.score}
            title={answer.title}
            text={answer.text}
            firstName={answer.author.firstName}
            lastName={answer.author.lastName}
            userScore={answer.author.score}
            userId={answer.author._id}
            isUpvotedByMe={getIsUpvotedByMe(answer.votes, userId)}
            onUpvote={() => onUpvote(answer._id)}
            onDownvote={() => onDownvote(answer._id)}
            isBest={bestAnswer === answer._id}
            canMark={canMark}
            onMarkBest={() => markAnswerBest(answer._id)}
          />
        )
    )}
  </Container>
);

const AnswerPost = styled(Post)`
  margin-bottom: 1rem;
`;

const Container = styled.div`
  margin-bottom: 2rem;
`;

export default AnswerList;
