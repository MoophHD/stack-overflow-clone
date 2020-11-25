import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Info from "./Info";
import Questions from "./Questions";
import Rating from "./Rating";
import { getUser } from "redux/user/user.actions";
import { Page, Container, Background } from "components/shared/lib";

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
  nickName,
}) => {
  useEffect(() => {
    if (match.params.id) getUser(match.params.id);
  }, [match.params.id, getUser]);

  // just a placeholder
  if (loading) return <div>spinner</div>;

  return email === null ? (
    <Redirect to="/auth/" />
  ) : (
    <Background>
      <Page>
        <Container>
          <Info
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
      </Page>
    </Background>
  );
};

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
