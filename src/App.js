import { React, BrowserRouter as Router, Switch, Route, Redirect } from './pages/perbendaharaan/libraries/dependencies';
import './App.css';
import Perbendaharaan from "./pages/perbendaharaan";

function App() {
  return (
    <Router>
      <Switch>
        {
          /* Redirect Ke /perbendaharaan */
          <Redirect
            exact={true}
            from="/"
            to="/perbendaharaan/perekaman-keberatan"
          />
        }
        <Route path="/perbendaharaan" exact component={Perbendaharaan} />
        <Route path="/perbendaharaan/:id" exact component={Perbendaharaan} />
      </Switch>
    </Router>
  )
}

export default App;
