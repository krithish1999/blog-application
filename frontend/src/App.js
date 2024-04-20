import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PostForm from './components/PostForm';
import DashboardTS from './pages/DashboardTs';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/postform" component={PostForm}/>
          <Route path="/dashboardts" component={DashboardTS}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
