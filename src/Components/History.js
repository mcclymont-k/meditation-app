import React, { Component } from 'react';
import HistoryRender from './HistoryRender'

class History extends Component {
  render(){
    return(
      <div>
        <div className='historyContainer'>History</div>
        <HistoryRender/>
      </div>


    )
  }
}

export default History
