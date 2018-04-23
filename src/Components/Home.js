import React, { Component } from 'react';
import Timer from './Timer'
import HistoryRender from './HistoryRender'
import HistoryChart from './HistoryChart'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      dataShow: true
    }
  }

  updateData() {
    this.setState({dataShow: !this.state.dataShow})
  }

  render() {
    return(
      <div>
        <div className='mainContainer'>
          <Timer/>
          <div className='historyRenderMain'>
            <h1 className='renderTitle'>Past History</h1>
            <button onClick={this.updateData.bind(this)}>Text/graph</button>
            <div className= 'dataVisuals'>
              {this.state.dataShow ? <HistoryRender /> : <HistoryChart />}
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default Home
