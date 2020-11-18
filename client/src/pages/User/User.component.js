import { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUser } from "../../redux/user/user.actions";
import QuestionCard from "../../components/QuestionCard/QuestionCard.component";

const User = ({ match, data, getUser }) => {
  useEffect(() => {
    if (match.params.id) getUser(match.params.id);
  }, [match.params.id, getUser]);

  return (
    <Wrapper>
      <QuestionCard
        authorName="Bruh Bruh"
        answerCount={5}
        isClosed={true}
        score={5}
        title="Lorem ipsum bruh bluh adasd"
      />
      {JSON.stringify(data)}
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
  data: state.user.data,
});

export default connect(mapStateToProps, { getUser })(User);
