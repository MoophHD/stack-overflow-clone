import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import { checkAndRefreshToken } from "./redux/auth/auth.actions";
import store from "./redux/store";
import { connect } from "react-redux";
import Auth from "./pages/Auth/Auth.component";
import User from "./pages/User/User.component";
import NavBar from "./components/NavBar/NavBar.component";
import styled from "styled-components";

if (store.getState().auth.token) {
  checkAndRefreshToken()(store.dispatch, store.getState);
}

const App = ({ userId, firstName, lastName }) => {
  return (
    <Router>
      <Wrapper>
        <NavBar userId={userId} firstName={firstName} lastName={lastName} />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </Wrapper>
    </Router>
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

export default connect(mapStateToProps)(App);
