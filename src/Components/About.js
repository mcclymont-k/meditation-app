import React, { Component } from 'react'
import {Link, Route, HashRouter as Router} from 'react-router-dom'



class About extends Component{
  render () {
    return(
      <div>
        <div className="contentContainer">
          <div className='aboutContent'>
            <div className="contentItem">
              <h1 className='aboutTitle'>What is meditation</h1>
              <p>
                Meditation is often described as the art of inner contemplation.
                It describes a multitude of different techniques used by many
                cultures around the world for many centuries.
                <br/><br/>Meditation can be used to develop inner perspective,
                self awareness, spiritual enlightenment, and stress management
                among many other uses.
                <br/><br/>Recently scientists have studied meditation in depth to
                gain understanding over the positive physical and mental health
                benefits related to the practive.
                <br/><br/>Please see the articles section for ideas on different
                forms of meditation and some current research.
              </p>
            </div>
            <div className="contentItem">
              <h1 className='aboutTitle'>My experience</h1>
              <p>
                I was never very fond of sitting quietly and rarely liked to be
                doing nothing. I always struggled as a child to sit and read books
                becuase my mind would wonder and I would quickly become restless.
                <br/><br/>In 2015, a friend of mine sat a 10 day Vipassana course
                in Auckland, New Zealand. I offered to pick him up after the
                completion of the 10 day silent retreat and help aclimiatise him
                back to the real world. When I arrived to pick up my friend I was
                blown away by the facilities, the energy of the place and the looks
                on the faces of those having completed the retreat.
              </p>
              <Link to='/story' style={{fontSize: '12px', color: 'red', paddingLeft: '5px'}}>Read more...</Link>
            </div>
            <div className="contentItem">
              <h1 className='aboutTitle'>Where to Start</h1>
              <p>
                I advise that you start slowly, you may want to use a guided
                meditation at first. Read through the
                <Link to='/articles' style={{fontSize: '12px', color: 'red', paddingLeft: '5px'}}>articles </Link>
                 section and find a particular practice that reaches out to you.
                Start with small goals and work your way towards longer sessions
                on a more regular basis.
                <br/><br/> Use the history tool to keep a check on how often and
                how long your meditations are.
              </p>
            </div>
          </div>
          <div className='contactInfo'>
            <h1>Contact Info:</h1>
            <h2> email: mcclymont.kieran@gmail.com</h2>
            <a href='https://github.com/mcclymont-k' target='_blank'><img src={require("../Pictures/gitHub.png")} ></img></a>
          </div>
        </div>
      </div>
    )
  }
}

export default About
