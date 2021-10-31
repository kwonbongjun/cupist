import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Main from './features/glam/Main';
import Profile from './features/glam/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className='nav'>
            <Link to='/' className='nav-item'>글램 탭</Link>
          </div>
          <div className='nav'>
            <Link to='/updateProfile'><i className="fas fa-user"></i>프로필 수정</Link>
          </div>
        </header>
        <div className="App-container">
          <Switch>
            <Route exact path='/updateProfile' component={Profile} />
            <Route component={Main} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
