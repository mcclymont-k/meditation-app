import React, { Component } from 'react';
import Timer from './Timer'
import HistoryRender from './HistoryRender'


class Home extends Component {
  render() {
    return(
      <div>
        <Timer/>
        <div className='historyBox'>
          <HistoryRender />
        </div>
      </div>
    )
  }
}


export default Home
