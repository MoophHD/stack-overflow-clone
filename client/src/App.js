import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./pages/Auth/Auth.component";
import "./index.css";
import { checkAndRefreshToken } from "./redux/auth/auth.actions";
import { useEffect } from "react";
import { connect } from "react-redux";
import setAuthToken from "./redux/auth/auth.utils";

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
          <Route path="/" component={Auth} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { checkAndRefreshToken })(App);
