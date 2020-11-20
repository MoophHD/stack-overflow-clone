import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUser } from "../../redux/user/user.actions";
import { Redirect } from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo.component";
import Questions from "./components/Questions/Questions.component";
import Rating from "./components/Rating/Rating.component";

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
  loading,
  nickName
}) => {
  useEffect(() => {
    if (match.params.id) getUser(match.params.id);
  }, [match.params.id, getUser]);

  // just a placeholder
  if (loading) return <div>spinner</div>;

  return email === null ? (
    <Redirect to="/auth/" />
  ) : (
    <Wrapper>
      <Container>
        <PersonalInfo
          firstName={firstName}
          lastName={lastName}
          nickName={nickName}
          email={email}
          jobExperience={jobExperience}
          jobPosition={jobPosition}
          techStack={techStack}
        />

        <Rating questions={questions} answers={answers} score={score} />

        <Questions questions={questions} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2% 2rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--color-plain);
`;

const Container = styled.section`
  background-color: white;
  padding: 2rem;
  width: 100%;
  border-radius: 0.35rem;
  display: flex;
  flex-direction: column;
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
  loading: state.user.loading,
  nickName: state.user.nickName,
});

export default connect(mapStateToProps, { getUser })(User);
