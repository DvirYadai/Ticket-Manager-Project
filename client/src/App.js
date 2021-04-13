import "./App.css";
import Main from "./Components/Main";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";

function App() {
  const [userLogged, setUserLogged] = useState("");

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {userLogged.length === 0 ? (
              <Login setUserLogged={setUserLogged} />
            ) : (
              <Redirect to="/main" />
            )}
          </Route>
          <Route exact path="/signup">
            {userLogged !== "" ? (
              <Redirect to="/main" />
            ) : (
              <SignUp setUserLogged={setUserLogged} />
            )}
          </Route>
          <Route exact path="/main">
            <Main userLogged={userLogged} setUserLogged={setUserLogged} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
