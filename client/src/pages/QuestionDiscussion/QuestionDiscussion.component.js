import { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getQuestion,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
  markAnswerBest,
  addAnswer,
} from "../../redux/questions/questions.actions";
import Question from "./components/Question/Question.component";
import AnswerList from "./components/AnswerList/AnswerList.component";
import AddAnswer from "./components/AddAnswer/AddAnswer.component";

const QuestionDiscussion = ({
  _id,
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
  addAnswer,
  bestAnswer,
  markAnswerBest,
}) => {
  const [isMyUpvote, setIsMyUpvote] = useState(null);
  const [stateAnswers, setStateAnswers] = useState([]);

  useEffect(() => {
    if (match.params.id) {
      (async () => await getQuestion(match.params.id))();
    }
  }, [match.params.id, getQuestion]);

  useEffect(() => {
    if (!answers || answers.length < 1) return;

    let sortedAnswers = answers.sort((a1, a2) => {
      if (a1.score !== a2.score) {
        return a2.score - a1.score;
      } else {
        return new Date(a2.createdAt) - new Date(a1.createdAt);
      }
    });

    const bestAnswerInd = sortedAnswers.findIndex((a) => a.isBest);
    if (bestAnswerInd) {
      sortedAnswers = [
        sortedAnswers[bestAnswerInd],
        ...sortedAnswers.slice(0, bestAnswerInd),
        ...sortedAnswers.slice(bestAnswerInd + 1),
      ];
    }

    setStateAnswers(sortedAnswers);
  }, [answers, bestAnswer]);

  useEffect(() => {
    if (userId && votes?.length > 0) {
      const myVote = votes.find((v) => v.user === userId);

      if (myVote) return setIsMyUpvote(myVote.vote === 1);
    }
    setIsMyUpvote(null);
  }, [userId, votes]);

  const questionId = match.params.id;
  return (
    <>
      {loading ? (
        <h2>spinner</h2>
      ) : (
        <Wrapper>
          <Container>
            <Question
              isMyUpvote={isMyUpvote}
              onUpvote={() => upvoteQuestion(questionId)}
              onDownvote={() => downvoteQuestion(questionId)}
              author={author}
              score={score}
              title={title}
              text={text}
            />

            <AnswerList
              canMark={userId === author._id}
              markAnswerBest={(answerId) => markAnswerBest(_id, answerId)}
              bestAnswer={bestAnswer}
              userId={userId}
              onDownvote={(answerId) => downvoteAnswer(questionId, answerId)}
              onUpvote={(answerId) => upvoteAnswer(questionId, answerId)}
              answers={stateAnswers}
            />

            {!bestAnswer && (
              <AddAnswer onSubmit={(text) => addAnswer(_id, text)} />
            )}
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
  addAnswer,
  markAnswerBest,
})(QuestionDiscussion);
