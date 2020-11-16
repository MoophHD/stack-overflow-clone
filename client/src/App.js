import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { checkAndRefreshToken } from "./redux/auth/auth.actions";
import store from "./redux/store";
import Auth from "./pages/Auth/Auth.component";
import User from "./pages/User/User.component";

if (store.getState().token) {
  checkAndRefreshToken();
}

const App = () => {
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

export default App;
