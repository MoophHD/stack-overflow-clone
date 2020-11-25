import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { loadUser } from "redux/auth/auth.actions";
import setAuthToken from "redux/auth/auth.utils";
import { history } from "redux/store";
import Auth from "components/pages/Auth";
import User from "components/pages/User";
import Questions from "components/pages/Questions";
import NavBar from "components/shared/NavBar";
import CreateQuestion from "components/pages/CreateQuestion";
import QuestionDiscussion from "components/pages/QuestionDiscussion";
import "./styles/index.scss";

const App = ({ userId, firstName, lastName, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
  }, []);

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, [loadUser]);

  return (
    <ConnectedRouter history={history}>
      <Wrapper>
        <NavBar userId={userId} firstName={firstName} lastName={lastName} />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/user/:id" component={User} />
          <Route path="/questions/:id" component={QuestionDiscussion} />
          <Route path="/ask-question" component={CreateQuestion} />
          <Route path="/" component={Questions} />
        </Switch>
      </Wrapper>
    </ConnectedRouter>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = (state) => ({
  userId: state.auth.user?._id,
  firstName: state.auth.user?.firstName,
  lastName: state.auth.user?.lastName,
});

export default connect(mapStateToProps, { loadUser })(App);
