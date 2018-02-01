import React, { Component } from 'react';
import bell from '../Sounds/Bell.wav'


class DigitalTimer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      minutes: 0,
      longestTime: 0,
      counter: 0,
      timerRunning: false,
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1
    };
  }


  handleStartClick() {
    console.log(this.state.currentDay)
    console.log(this.state.currentMonth)
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

  saveHistory() {
    let date = this.state.currentDay + ':' + this.state.currentMonth
    let timer = this.state.longestTime
    console.log(date)
    console.log(timer)
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
          <button type='button'>Save

          </button>
        </div>
        <h2>Longest Time: {this.longestTimeHandler()} </h2>
        <audio src={bell} className='bell'></audio>
      </div>
    )
  }
}

export default DigitalTimer
