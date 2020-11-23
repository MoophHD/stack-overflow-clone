import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getQuestion } from "../../redux/questions/questions.actions";
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
}) => {
  useEffect(() => {
    if (match.params.id) {
      (async () => await getQuestion(match.params.id))();
    }
  }, [match.params.id, getQuestion]);

  return (
    <>
      {loading ? (
        <h2>spinner</h2>
      ) : (
        <Wrapper>
          <Container>
            <Question author={author} score={score} title={title} text={text} />
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
  loading: state.questions.loading,
});

export default connect(mapStateToProps, { getQuestion })(QuestionDiscussion);
