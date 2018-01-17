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


  constructor() {
    super();
    this.state = {
      seconds: 0,
      minutes: 0
    };
  }


  handleStartClick() {
    this.incrementer = setInterval(() => {
      this.setState({seconds:(this.state.seconds + 1)})
    }, 1000);
  };

  handleStopClick() {
    clearInterval(this.incrementer)

  };

  getSeconds() {
    return ('0' + this.state.seconds % 60).slice(-2)
  }

  getMinutes() {
    return (Math.floor(this.state.seconds / 60))
  }

  reset() {
    this.setState({
      seconds: 0,
      minutes: 0
    })
  }
  render() {

    return (
      <div>
        <h1>{this.getMinutes()} : {this.getSeconds()}</h1>
        <button type='button' onClick={this.handleStartClick.bind(this)}>
          Start
        </button>
        <button type='button' onClick={this.handleStopClick.bind(this)}>
          Stop
        </button>
        <button type='button' onClick={this.reset.bind(this)}>
          Reset
        </button>
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
        {this.state.serverData ?
          <div>
            <MenuBar/>
            <OptionsMenu/>
            <div className='timerContainer'>
              <AnalogTime/>
              <DigitalTime/>
            </div>
          </div>
          : []}
      </div>
    )


  }
}

export default App;
