import React, { Component } from 'react';


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

export default OptionType
