import { React, BrowserRouter as Router, Switch, Route } from './pages/perbendaharaan/libraries/dependencies';
import './App.css';
// import appRoutes from './pages/perbendaharaan/routes';
import Perbendaharaan from "./pages/perbendaharaan";

function App() {
  return (
    <Router>
      <Switch>
        {/* {appRoutes.map(route => <Route key={route.name} {...route} />)} */}
        <Route path="/perbendaharaan" exact component={Perbendaharaan} />
        <Route path="/perbendaharaan/:id" exact component={Perbendaharaan} />
      </Switch>
    </Router>
  )
}

export default App;
