import React, { Component } from 'react';
import './App.css';
import bell from './Sounds/Bell.wav'
import instagram from './Pictures/instagram.jpg'
import facebook from './Pictures/facebook.jpg'
import twitter from './Pictures/twitter.png'

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
        <div className = 'menuBarButton buttonOne'>Home</div>
        <div className = 'menuBarButton buttonTwo'>Timer</div>
        <div className = 'menuBarButton buttonThree'>History</div>
        <div className = 'menuBarButton buttonFour'>Settings</div>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={instagram}></img></div>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={facebook}></img></div>
        <div className = 'menuBarButton socialButton'><img className='socialButtonPic' src={twitter}></img></div>
      </div>
    )
  }
}

class OptionType extends Component {
  constructor(){
    super()
    this.state = {
      reminder: 0,
      decision: 0
    }
  }

  componentDidMount(){
    let event = document.getElementById('timerSelect')
    event.addEventListener('change', e => {
      this.setState({reminder: event.options[event.selectedIndex].value})
      this.props.connector(this.state.reminder)
    })

    let decisionSelect = document.getElementById('visualTimer')
    decisionSelect.addEventListener('change', e => {
      this.setState({decision: decisionSelect.options[decisionSelect.selectedIndex].value})
      this.props.decisionConnector(this.state.decision)
    })
  }

  render() {
    return(
      <div className='optionsBar'>
        <h1 className='eachOption optionTag'>Options</h1>
        <div className='eachOption'>
          <select id='timerSelect'>
            <option selected disabled>Set the reminder Gong</option>
            <option value=''>No reminders</option>
            <option value='60'>1 min reminder</option>
            <option value='300'>5 min reminder</option>
            <option value='600'>10 min reminder</option>
            <option value='3600'>60 min reminder</option>
          </select>
        </div>
        <div className='eachOption'>
          <select id='visualTimer'>
            <option selected disabled>Show the animated clock?</option>
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
      counter: 0,
      timerRunning: false
    };
  }


  handleStartClick() {
    const timer = document.querySelector('.secondsHand')
    const audio = document.querySelector('.bell')
    if (this.state.timerRunning === false){
      audio.play()
      this.incrementer = setInterval(() => {
        timer.style.animation = 'spinner 1s ease-out infinite'
        this.setState({
          timerRunning: true,
          counter: this.props.counterState,
          seconds:(this.state.seconds + 1),
          minutes: Math.floor(this.state.seconds / 60)
        })
        if (this.state.seconds%this.state.counter === 0){
          audio.play()
        }
      }, 1000);
    }

  };

  handleStopClick() {
    const timer = document.querySelector('.secondsHand')
    if (this.state.seconds > this.state.longestTime){
      this.setState({longestTime: this.state.seconds})
    }
    clearInterval(this.incrementer)
    timer.style.animation = '';
    this.setState({
      timerRunning: false
    })
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
    let longestTime = this.state.longestTime
    if (longestTime > 60){
      return Math.floor(longestTime /60) + ":" +
      ('0' + longestTime % 60).slice(-2);
    } else {
      return ('0' + longestTime % 60).slice(-2)
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
      decision: 0,
    }
  }

  connector(data) {
    this.setState({counter : data})
  }

  decisionConnector(data){
    this.setState({decision: data})
  }

  handleDecision () {
    const clock = document.querySelector('.clock')
    if (clock){
      if (this.state.decision === '0' && (clock.classList.contains('clicked') === false)) {
        clock.classList.toggle('clicked')
      } else if (this.state.decision === '1' && (clock.classList.contains('clicked') === true)){
        clock.classList.toggle('clicked')

      }
    }
  }

  render() {
    return (
      <div>
        {this.state.serverData ?
          <div>
            <MenuBar/>
            <OptionType
              {...this.handleDecision()}
              connector={this.connector.bind(this)}
              decisionConnector={this.decisionConnector.bind(this)}
            />
            <div className='timerContainer'>
              <DigitalTime
                counterState={this.state.counter}
                decisionState={this.state.decision}
              />
            </div>
          </div>
          : []}
      </div>
    )
  }
}

export default App;
