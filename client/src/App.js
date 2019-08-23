import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/home';
import Search from './pages/Search/search';
import Login from './pages/Login/login';
import NewUser from './pages/NewUser/newUser';
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={NewUser} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;