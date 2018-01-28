import React, { Component } from 'react';
import bell from '../Sounds/Bell.wav'
import instagram from '../Pictures/instagram.jpg'
import facebook from '../Pictures/facebook.jpg'
import twitter from '../Pictures/twitter.png'
import {Link, Route, HashRouter as Router} from 'react-router-dom'


class MenuBar extends Component {
  render() {
    return(
      <div className='menuBarContainer'>
        <Link to='/' className = 'menuBarButton buttonOne'>Home</Link>
        <Link to='/articles' className = 'menuBarButton buttonFour'>Articles</Link>
        <Link to='/timer' className = 'menuBarButton buttonTwo'>Timer</Link>
        <Link to='/history' className = 'menuBarButton buttonThree'>History</Link>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={instagram}></img></div>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={facebook}></img></div>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={twitter}></img></div>
      </div>
    )
  }
}

export default MenuBar
