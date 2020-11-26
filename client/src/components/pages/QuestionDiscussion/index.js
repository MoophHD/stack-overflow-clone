import { useEffect, useState } from "react";
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
} from "redux/questions/questions.actions";
import Post from "components/shared/Post";
import { Heading, Page, Background } from "components/shared/lib";
import AnswerPagination from "./AnswerPagination";
import Spinner from "components/shared/Spinner";

const ANSWERS_PER_PAGE = 5;

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
  const [isUpvotedByMe, setIsMyUpvote] = useState(null);
  const [stateAnswers, setStateAnswers] = useState([]);
  const [page, setPage] = useState(1);
  const pageCount = answers ? Math.ceil(answers.length / ANSWERS_PER_PAGE) : 0;

  useEffect(() => {
    if (match.params.id) {
      getQuestion(match.params.id);
    }
  }, [match.params.id, getQuestion]);

  // ANSWER SORT
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
    <Background>
      <Page>
        {loading || !_id? (
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
              isUpvotedByMe={isUpvotedByMe}
              onUpvote={() => upvoteQuestion(questionId)}
              onDownvote={() => downvoteQuestion(questionId)}
            />

            <Heading margin>{answers.length} answers</Heading>

            <AnswerList
              canMark={userId === author._id}
              markAnswerBest={(answerId) => markAnswerBest(_id, answerId)}
              bestAnswer={bestAnswer}
              userId={userId}
              onDownvote={(answerId) => downvoteAnswer(questionId, answerId)}
              onUpvote={(answerId) => upvoteAnswer(questionId, answerId)}
              answers={stateAnswers.slice(
                ANSWERS_PER_PAGE * (page - 1),
                ANSWERS_PER_PAGE * page
              )}
            />

            <AnswerPagination
              pageCount={pageCount}
              page={page}
              onPageChange={(n) => setPage(n)}
            />

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
