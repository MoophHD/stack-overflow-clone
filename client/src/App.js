import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./pages/Auth/Auth.component";
import "./index.css";
import store from "./redux/store";
import setAuthToken from "./redux/auth/auth.utils";
import { refreshToken } from "./redux/auth/auth.actions";

//move into component
if (localStorage.token) {
  setAuthToken(localStorage.token);
} else {
  refreshToken()(store.dispatch);
}

// (async () => {await refreshToken()()})()

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={Auth} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
