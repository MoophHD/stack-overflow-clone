import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getQuestion,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
} from "../../redux/questions/questions.actions";
import Question from "./components/Question/Question.component";

const QuestionDiscussion = ({
  author,
  score,
  answers,
  title,
  text,
  match,
  getQuestion,
  loading,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
  userId,
  votes,
}) => {
  console.log(`score ${score}`);
  const [isMyUpvote, setIsMyUpvote] = useState(null);
  useEffect(() => {
    if (match.params.id) {
      (async () => await getQuestion(match.params.id))();
    }
  }, [match.params.id, getQuestion]);

  useEffect(() => {
    if (userId && votes?.length > 0) {
      const myVote = votes.find((v) => v.user === userId);

      if (myVote) return setIsMyUpvote(myVote.vote === 1);
    }
    setIsMyUpvote(null);
  }, [userId, votes]);

  return (
    <>
      {loading ? (
        <h2>spinner</h2>
      ) : (
        <Wrapper>
          <Container>
            <Question
              isMyUpvote={isMyUpvote}
              onUpvote={() => upvoteQuestion(match.params.id)}
              onDownvote={() => downvoteQuestion(match.params.id)}
              author={author}
              score={score}
              title={title}
              text={text}
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding: 2% 10rem;
  background-color: var(--color-plain);
  flex: 1;
`;

const Container = styled.section`
  border-radius: var(--br);
`;

const mapStateToProps = (state) => ({
  ...state.questions.question,
  userId: state.auth.user?._id,
  loading: state.questions.loading,
});

export default connect(mapStateToProps, {
  getQuestion,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
})(QuestionDiscussion);
