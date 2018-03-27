import React, { Component } from 'react';
import Timer from './Timer'
import HistoryRender from './HistoryRender'


class Home extends Component {
  render() {
    return(
      <div>
        <div className='mainContainer'>
          <Timer/>
          <div className='historyRenderMain'>
            <h1 className='renderTitle'>Past History</h1>
            <HistoryRender />
          </div>
        </div>

      </div>
    )
  }
}


export default Home
