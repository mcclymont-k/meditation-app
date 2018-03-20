import React, { Component } from 'react';
import fire from '../fire.js'
const database = fire.database()

class HistoryRender extends Component {
  constructor() {
    super()
    this.state = {
      history: [],
    }
  }

  componentDidMount() {
    const historyRef = database.ref('history')
    historyRef.on('value', data => {
      let historyData = data.val()
      let keys = Object.keys(historyData)
      let timeArray = []
      keys.forEach(data => {
        if (historyData[data].date === undefined) {
          return
        }
        const time = historyData[data].time
        const day = historyData[data].date.day
        const month = historyData[data].date.month
        timeArray.push({
          time: time,
          day: day,
          month: month
        })
      })
      this.setState({history: timeArray.reverse()})
    })
  }

  render() {
    return(
      <div>
        {this.state.history.map((unit) => {
          return (
            <div>
              <h1>Time: {unit.time}</h1>
              <h1>Day: {unit.day}</h1>
              <h1>Month: {unit.month}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

export default HistoryRender
