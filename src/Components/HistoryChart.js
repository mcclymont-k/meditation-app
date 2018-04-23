import React, { Component } from 'react';
import fire from '../fire.js'
import * as d3 from "d3"
const database = fire.database()

class HistoryChart extends Component {

  constructor() {
    super()
    this.state = {
      newData: [],
      hoverOver: false,
    }
  }

  componentDidMount() {
    const historyRef = database.ref('history')
    historyRef.on('value', data => {
      let historyData = data.val()
      let keys = Object.keys(historyData)
      let timeData =[]
      keys.forEach(data => {
        let times = historyData[data].time
        timeData.push(times)
      })
      this.setState({newData: timeData.reverse()})
    })
  }

  mainChart() {
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(this.state.newData)])
      .range([0, '100%'])

    let yScale = d3.scaleBand()
      .domain(d3.range(0, 10))
      .range([0, '318'])

    let colors = d3.scaleLinear()
      .domain([0, 10])
      .range(['#3e96bc', 'red'])

    let animateDuration = 550
    let animateDelay = 20



    let removeChart = d3.selectAll('svg').remove();

    let mainChart = d3.select('.mainChart')
      .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('background', '#011c28')

    mainChart.selectAll('rect')
      .data(this.state.newData)
      .enter().append('rect')
        .style('fill', (d, i) => colors(i))
        .style('opacity', 0.7)
        .style('margin-top', '5')
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('x', 0)
        .attr('y', (d, i) => i * yScale.bandwidth())
        .style('top', 0)
      .on('mouseover', (d, i, n) => {
        let eventTarget = d3.select(d3.event.target)
          .transition()
          .style('opacity', 1)
          .duration(animateDuration)
        }
      )
      .on('mouseout', (d) => {
        d3.select(d3.event.target)
          .transition()
          .style('opacity', 0.7)
          .duration(animateDuration)
        d3.selectAll('rect').style('fill', (d, i) => colors(i))
        }
      )


    let allRects = d3.selectAll('rect')
    allRects.transition()
      .attr('width', (d) => xScale(d))
      .ease(d3.easeElastic)
      .duration(animateDuration)
      .delay((d, i) => i * animateDelay)
  }

  render() {
    return(
    <div className="mainChart">
      {this.mainChart()}
    </div>
    )
  }
}

export default HistoryChart
