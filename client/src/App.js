import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <Login setUserLogged={setUserLogged} userLogged={userLogged} />
          </Route>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/main">
            <Main userLogged={userLogged} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
