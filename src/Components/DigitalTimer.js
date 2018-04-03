import React, { Component } from 'react';
import bell from '../Sounds/Bell.wav'
import fire from '../fire.js'
const database = fire.database()

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      seconds: 0,
      minutes: 0,
      counter: 0,
      timerRunning: false,
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
    }
  }

  handleStartClick() {
    console.log(this.state.currentYear)
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

  saveData() {
    let secondsCount = 0
    const historyRef = database.ref('history')
    if (this.state.seconds%60 < 10){
      secondsCount = '0' + this.state.seconds%60
    } else {
      secondsCount = this.state.seconds%60
    }
    const data = {
      time: this.state.minutes + ':' + secondsCount,
      date: {
        day: this.state.currentDay,
        month: this.state.currentMonth,
        year: this.state.currentYear
      }
    }
    historyRef.push(data)
    this.reset()
  }

  render() {
    return (
      <div className='digitalTimer'>
        <h1>Timer</h1>
        <div className='clock'>
          <div className='secondsHand'>
            <div className='hand'></div>
          </div>
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
          <button type='button' onClick={this.saveData.bind(this)}>Save</button>
        </div>
        <audio src={bell} className='bell'></audio>
      </div>
    )
  }
}

export default DigitalTimer
