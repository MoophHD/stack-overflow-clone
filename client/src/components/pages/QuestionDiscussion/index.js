import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import AnswerList from "./AnswerList";
import AddAnswer from "./AddAnswer";
import {
  getQuestion,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
  markAnswerBest,
  addAnswer,
  getAnswers,
  resetQuestion,
} from "redux/questionDiscussion/questionDiscussion.actions";
import Post from "components/shared/Post";
import { Heading, Page, Background } from "components/shared/lib";
import Spinner from "components/shared/Spinner";
import PagePagination from "components/shared/PagePagination";

function getIsUpvotedByMe(votes, id) {
  const myVote = votes.find((v) => v.user === id)?.vote;

  if (!myVote) return null;

  return myVote === 1;
}

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
  getAnswers,
  currentPage,
  pageCount,
  answerCount,
  resetQuestion,
}) => {
  const setPage = useCallback(
    (n) => {
      getAnswers(_id, n);
    },
    [getAnswers, _id]
  );

  // FETCH QUESTION INFO
  useEffect(() => {
    if (match.params.id) {
      getQuestion(match.params.id);
      getAnswers(match.params.id, 1);
    }

    return () => resetQuestion();
  }, [match.params.id, getQuestion, getAnswers, resetQuestion]);

  const questionId = match.params.id;
  return (
    <Background>
      <Page>
        {loading || !_id ? (
          <Spinner light />
        ) : (
          <>
            <Heading margin>{title}</Heading>

            <Post
              score={score}
              text={text}
              firstName={author.firstName}
              lastName={author.lastName}
              userScore={author.score}
              userId={author._id}
              isUpvotedByMe={getIsUpvotedByMe(votes, userId)}
              onUpvote={() => upvoteQuestion(questionId)}
              onDownvote={() => downvoteQuestion(questionId)}
            />

            <Heading margin>{answerCount} answers</Heading>

            <AnswerList
              canMark={userId === author._id}
              markAnswerBest={(answerId) => markAnswerBest(_id, answerId)}
              bestAnswer={bestAnswer}
              userId={userId}
              onDownvote={(answerId) => downvoteAnswer(questionId, answerId)}
              onUpvote={(answerId) => upvoteAnswer(questionId, answerId)}
              answers={answers}
            />

            {pageCount > 1 && (
              <PagePagination
                pageCount={pageCount}
                page={currentPage}
                onPageChange={(n) => setPage(n)}
              />
            )}

            {!bestAnswer && (
              <AddAnswer onSubmit={(text) => addAnswer(_id, text)} />
            )}
          </>
        )}
      </Page>
    </Background>
  );
};

const mapStateToProps = (state) => ({
  ...state.questionDiscussion.question,
  userId: state.auth.user?._id,
  loading: state.questionDiscussion.loading,
  currentPage: state.questionDiscussion.answers.currentPage,
  pageCount: state.questionDiscussion.answers.pageCount,
  answerCount: state.questionDiscussion.answers.answerCount,
  answers: state.questionDiscussion.answers.page,
});

export default connect(mapStateToProps, {
  getQuestion,
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
  addAnswer,
  markAnswerBest,
  getAnswers,
  resetQuestion,
})(QuestionDiscussion);
