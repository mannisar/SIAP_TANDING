import { React, BrowserRouter as Router, Switch, Route } from './pages/perbendaharaan/libraries/dependencies';
import './App.css';
import appRoutes from './pages/perbendaharaan/routes';

function App() {
  return (
    <Router>
      <Switch>
        {appRoutes.map(route => <Route key={route.name} {...route} />)}
      </Switch>
    </Router>
  )
}

export default App;
