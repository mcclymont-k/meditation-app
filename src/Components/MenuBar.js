import React, { Component } from 'react';
import {Link, Route, HashRouter as Router} from 'react-router-dom'


class MenuBar extends Component {
  render() {
    return(
      <div>
        <h1 className='menuBarTitle'>Meditation-Timer</h1>
        <div className='menuBarContainer'>
          <Link to='/' className = 'menuBarButton buttonOne'>Home</Link>
          <Link to='/articles' className = 'menuBarButton buttonTwo'>Articles</Link>
          <Link to='/about' className = 'menuBarButton buttonThree'>About</Link>
        </div>
      </div>
    )
  }
}

export default MenuBar
