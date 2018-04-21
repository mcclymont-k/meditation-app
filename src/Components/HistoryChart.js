import React, { Component } from 'react';
import fire from '../fire.js'
import * as d3 from "d3"
const database = fire.database()

class HistoryChart extends Component {

  constructor() {
    super()
    this.state = {
      data: [12, 14, 15, 16, 78, 4],
      newData: [],
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
      .range(['white', '#3e96bc'])

    let animateDuration = 550
    let animateDelay = 20



    let myChart =
      d3.selectAll('svg').remove();
      d3.select('.mainChart').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('background', '#011c28')
        .selectAll('rect')
          .data(this.state.newData)
          .enter().append('rect')
            .style('fill', (d, i) => colors(i))
            .style('margin-top', '5')
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .attr('x', 0)
            .attr('y', (d, i) => i * yScale.bandwidth())
            .style('top', 0)


    let popUp = d3.select('.historyRenderMain').append('div')
      .attr('id', 'popUp')
      .style('position', 'absolute')
      .style('opacity', '0')
      .style('background', 'green')
      .style('padding', '10')
      .style('width', '200px')
      .style('height', '200px')
      .style('top', '-100%')

    d3.selectAll('rect')
      .transition()
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
