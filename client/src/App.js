import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./pages/Auth";
import "./index.css";
import store from "./redux/store";

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
