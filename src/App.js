import React, { Component } from 'react';
import './App.css';
import bell from './Sounds/Bell.wav'


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
  constructor(){
    super()
    this.state = {
      reminder: 0,
    }
  }

  componentDidMount(){
    let event = document.getElementById('timerSelect')
    event.addEventListener('change', e => {
      this.setState({reminder: event.options[event.selectedIndex].value})
      this.props.connector(this.state.reminder)
    })
  }

  render() {
    return(
      <div className='optionsBar'>
        <h1>Options</h1>
        <div>
          <select id='timerSelect'>
            <option value=''>Muted</option>
            <option value='60'>1 min reminder</option>
            <option value='300'>5 min reminder</option>
            <option value='600'>10 min reminder</option>
            <option value='3600'>60 min reminder</option>
          </select>
          <select id='visualTimer'>
            <option value='1'>yes</option>
            <option value='0'>no</option>
          </select>
        </div>
      </div>
    )
  }
}


class DigitalTime extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      minutes: 0,
      longestTime: 0,
      counter: 0
    };
  }


  handleStartClick() {
    const timer = document.querySelector('.secondsHand')
    const audio = document.querySelector('.bell')
    this.incrementer = setInterval(() => {
      timer.style.animation = 'spinner 1s ease-out infinite'
      this.setState({
        counter: this.props.counterState,
        seconds:(this.state.seconds + 1),
        minutes: Math.floor(this.state.seconds / 60)
      })
      if (this.state.seconds%this.state.counter === 0){
        audio.play()
      }
    }, 1000);
  };

  handleStopClick() {
    const timer = document.querySelector('.secondsHand')
    if (this.state.seconds > this.state.longestTime){
      this.setState({longestTime: this.state.seconds})
    }
    clearInterval(this.incrementer)
    timer.style.animation = '';
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

  longestTimeHandler() {
    if (this.state.longestTime > 60){
      return Math.floor(this.state.longestTime /60) + ":" +
      ('0' + this.state.longestTime % 60).slice(-2);
    } else {
      return ('0' + this.state.longestTime % 60).slice(-2)
    }
  }

  render() {

    return (
      <div className='digitalTimer'>
        <h1>Timer</h1>
        <div className='clock'>
          <div className='secondsHand'><div className='hand'></div></div>
        </div>
        <h1>{this.getMinutes()} : {this.getSeconds()}</h1>
        <div className='timerButtonContainer'>
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
        <h2>Longest Time: {this.longestTimeHandler()} </h2>
        <audio src={bell} className='bell'></audio>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: fakeUser,
      counter: 0,
    }
  }

  connector(data) {
    this.setState({counter : data})
  }

  render() {
    return (
      <div>
        {this.state.serverData ?
          <div>
            <MenuBar/>
            <OptionsMenu connector={this.connector.bind(this)}/>
            <div className='timerContainer'>
              <DigitalTime counterState={this.state.counter}/>
            </div>
          </div>
          : []}
      </div>
    )
  }
}

export default App;
