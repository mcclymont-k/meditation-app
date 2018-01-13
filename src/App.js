import React, { Component } from 'react';
import './App.css';


let fakeUser = {
  name: "Kieran",
  times: {
    'longest sit': 1200,
    'Maximum days in a row': 19,
    'favorite meditation': "vipassana"
  }
}

class MenuBar extends Component {
  render() {
    return(
      <div className='menuBarContainer'>
        <div className = 'menuBarButton'>Home</div>
        <div className = 'menuBarButton'>Timer</div>
        <div className = 'menuBarButton'>History</div>
        <div className = 'menuBarButton'>Settings</div>
        <div className = 'menuBarButton socialButton'>I</div>
        <div className = 'menuBarButton socialButton'>F</div>
        <div className = 'menuBarButton socialButton'>T</div>
      </div>
    )
  }
}

class OptionsMenu extends Component {
  render() {
    return(
      <div className='optionsBar'>
        Options
      </div>
    )
  }
}

class DigitalTime extends Component {
  render() {
    return(
      <h2>Digital Timer</h2>
    )
  }
}

class AnalogTime extends Component {

  componentDidMount() {
    let now
    setInterval(() => {
      now = new Date();
      console.log(now.getHours(), now.getMinutes(), now.getSeconds());
    }, 1000)
  }

  render(){

    return(
      <div>
        <div>Analog timer</div>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: fakeUser}
  }

  render() {
    return (
      <div>
        <MenuBar/>
        <OptionsMenu/>
        <div className='timerContainer'>
          <AnalogTime/>
          <DigitalTime/>
        </div>
      </div>
    )


  }
}

export default App;
