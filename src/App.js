import { React, BrowserRouter as Router, Switch } from './pages/perbendaharaan/libraries/dependencies';
import './App.css';
import Perbendaharaan from "./pages/perbendaharaan";

function App() {
  return (
    <Router>
      <Switch>
        <Perbendaharaan />
      </Switch>
    </Router>
  )
}

export default App;
