import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "./redux/auth/auth.utils";
import { connect } from "react-redux";
import styled from "styled-components";
import Auth from "./pages/Auth/Auth.component";
import User from "./pages/User/User.component";
import Questions from "./pages/Questions/Questions.component";
import NavBar from "./components/NavBar/NavBar.component";
import { useEffect } from "react";

const App = ({ userId, firstName, lastName, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) setAuthToken(localStorage.token);
  }, []);
  
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Router>
      <Wrapper>
        <NavBar userId={userId} firstName={firstName} lastName={lastName} />
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/user/:id" component={User} />
          <Route path="/" component={Questions} />
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

export default connect(mapStateToProps, { loadUser })(App);
