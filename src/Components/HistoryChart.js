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
      .range([0, '100'])

    let yScale = d3.scaleBand()
      .domain(d3.range(0, 10))
      .range([0, '318'])

    let colors = d3.scaleLinear()
      .domain([0, 10])
      .range(['#3e96bc', 'red'])

    let animateDuration = 550
    let animateDelay = 20


    // Prevents duplication by removing svg on each re render
    let removeChart = d3.selectAll('svg').remove();

    let mainChart = d3.select('.mainChart')
      .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('background', '#011c28')
    // Selects and appends text boxes beneath each rect
    mainChart.selectAll('text')
      .data(this.state.newData)
      .enter().append('text')
        .style('fill', (d, i) => colors(i))
        .style('opacity', 1)
        .attr('x', - 50)
        .attr('y', (d, i) => i * 31.8 + 20)
        .text((d) => {
          if (d > 60) {
            return `${Math.floor(d/60)}.${Math.floor(d%60)}s`
          } else {
            return d + 's'
          }
        })

        .style('font-size', '15px')
    // Selects and appends rects with a width of 0
    mainChart.selectAll('rect')
      .data(this.state.newData)
      .enter().append('rect')
        .style('fill', (d, i) => colors(i))
        .style('opacity', 1)
        .style('margin-top', '5')
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('x', 0)
        .attr('y', (d, i) => i * yScale.bandwidth())
        .style('top', 0)
      .on('mouseover', (d, i, n) => {
        let eventTarget = d3.select(d3.event.target)
          .transition()
          .style('opacity', 0.5)
          .attr('width', '100%')
          .duration(animateDuration)
          let selector = d3.selectAll('text').nodes()
          d3.select(selector[i])
            .transition()
            .attr('x', 20)
            .duration(1000)
            .delay(100)
            .ease(d3.easeElastic)
        }
      )
      .on('mouseout', (d, i) => {
        d3.selectAll('text')
          .transition()
          .duration(10)
          .attr('x', -50)
        d3.select(d3.event.target)
          .transition()
          .style('opacity', 1)
          .attr('width', (d) => xScale(d) + '%')
          .duration(animateDuration)
        d3.selectAll('rect').style('fill', (d, i) => colors(i))
        }
      )

    // Animation for loading of data, runs if new data is added.
    let allRects = d3.selectAll('rect')
    allRects.transition()
      .attr('width', (d) => xScale(d) + '%')
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
