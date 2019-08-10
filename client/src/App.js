import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home/home';
import Search from './pages/Search/search';
import Navbar from "./components/Navbar/navbar";
import Login from "./pages/Login/login"

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
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;