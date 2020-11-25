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
          <AnswerPost
            key={answer._id}
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
