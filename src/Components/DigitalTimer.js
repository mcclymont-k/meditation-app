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
    const timer = document.querySelector('.secondsHand')
    const audio = document.querySelector('.bell')
    const title = document.querySelector('.menuBarTitle')
    audio.volume = 0.1
    if (this.state.timerRunning === false){
      title.style.color = "red"
      audio.currentTime = 0
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
    const title = document.querySelector('.menuBarTitle')
    title.style.color = "white"
    const audio = document.querySelector('.bell')
    let fadeAudio = setInterval( function() {
      if (audio.volume.toFixed(2) !== '0.00'){
        audio.volume -= 0.01
      } else {
        clearInterval(fadeAudio)
      }
    }, 200)

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
    if (this.state.timerRunning === true) {
      return
    } else {
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
  }

  render() {
    return (
      <div className='digitalTimer'>
        <div className='clock'>
          <div className='secondsHand'>
            <div className='hand'></div>
          </div>
        </div>
        <h1 className="digitalClock">{this.getMinutes()} : {this.getSeconds()}</h1>
        <div>
          <button type='button' className='timerButton startButton' onClick={this.handleStartClick.bind(this)}>
            Start
          </button>
          <button type='button' className='timerButton stopButton' onClick={this.handleStopClick.bind(this)}>
            Stop
          </button>
          <button type='button' className='timerButton resetButton' onClick={this.reset.bind(this)}>
            Reset
          </button>
          <button type='button' className='timerButton saveButton' onClick={this.saveData.bind(this)}>Save</button>
        </div>
        <audio src={bell} className='bell'></audio>
      </div>
    )
  }
}

export default DigitalTimer
