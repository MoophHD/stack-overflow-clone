import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUser } from "../../redux/user/user.actions";
// import QuestionCard from "../../components/QuestionCard/QuestionCard.component";

const User = ({
  match,
  firstName,
  lastName,
  score,
  answers,
  questions,
  getUser,
  email,
  jobExperience,
  jobPosition,
  techStack,
}) => {
  useEffect(() => {
    if (match.params.id) getUser(match.params.id);
  }, [match.params.id, getUser]);

  return (
    <Wrapper>
      {JSON.stringify(firstName)}
      {JSON.stringify(lastName)}
      {JSON.stringify(score)}
      {JSON.stringify(answers)}
      {JSON.stringify(questions)}
      {JSON.stringify(email)}
      {JSON.stringify(jobExperience)}
      {JSON.stringify(jobPosition)}
      {JSON.stringify(techStack)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-plain);
`;

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  score: state.user.score,
  answers: state.user.answers,
  questions: state.user.questions,
  email: state.user.email,
  jobExperience: state.user.jobExperience,
  jobPosition: state.user.jobPosition,
  techStack: state.user.techStack,
});

export default connect(mapStateToProps, { getUser })(User);
