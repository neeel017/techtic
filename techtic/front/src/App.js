import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './component/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckIfLoggedIn from './component/hoc/CheckIfLoggedIn';
import RequireAuth from './component/hoc/RequireAuth';
import Dashboard from './component/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path='/login' component={CheckIfLoggedIn(
              () => <div className="wrapper__container">
                <Login />
              </div>
            )} />
            <Route
              path="/dashboard"
              component={RequireAuth(Dashboard)}
            />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
