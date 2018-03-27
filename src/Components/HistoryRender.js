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
        let month = historyData[data].date.month
        if (month < 10) {
          month = '0' + month
        }
        const year = historyData[data].date.year
        timeArray.push({
          time: time,
          day: day,
          month: month,
          year: year
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
              <h1>
                Date of meditation: {unit.day} / {unit.month} / {unit.year}
              </h1>
              <h1>Length of meditation: {unit.time}</h1>
              <div className='borderBottom'></div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default HistoryRender
