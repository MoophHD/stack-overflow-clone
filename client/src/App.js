import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { checkAndRefreshToken } from "./redux/auth/auth.actions";
import { useEffect } from "react";
import { connect } from "react-redux";
import setAuthToken from "./redux/auth/auth.utils";
import Auth from "./pages/Auth/Auth.component";
import User from "./pages/User/User.component";

const App = ({ token, checkAndRefreshToken }) => {
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      checkAndRefreshToken();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { checkAndRefreshToken })(App);
