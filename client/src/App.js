import { Switch, Route } from "react-router-dom";
import "./styles/index.scss";
import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "./redux/auth/auth.utils";
import { connect } from "react-redux";
import styled from "styled-components";
import Auth from "./pages/Auth/Auth.component";
import User from "./pages/User/User.component";
import Questions from "./pages/Questions/Questions.component";
import NavBar from "./components/NavBar/NavBar.component";
import CreateQuestion from "./pages/CreateQuestion/CreateQuestion.component";
import { useEffect } from "react";
import QuestionDiscussion from "./pages/QuestionDiscussion/QuestionDiscussion.component";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

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
