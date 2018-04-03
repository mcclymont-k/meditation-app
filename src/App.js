import React, { Component } from 'react';
import {Link, Route, HashRouter as Router} from 'react-router-dom'
import MenuBar from './Components/MenuBar'
import Home from './Components/Home'
import About from './Components/About'
import Articles from './Components/Articles'
import './App.css'

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <MenuBar/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/articles' component={Articles}/>
          <Route exact path='/about' component={About}/>
        </div>
      </Router>
    )
  }
}


export default App
