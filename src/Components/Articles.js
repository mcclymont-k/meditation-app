import React, { Component } from 'react'

class Articles extends Component {
  constructor() {
    super()
    this.state = {
      articles: [
        {
          name: 'Vipassana Is the Craziest Shit You ll Ever Do.',
          image: 'https://thelinknewspaper.ca/images/made/images/articles/Volume_37/Ops/_resized/16.OPS.Meditation.ZoeGelfant_900_1245_90.jpg',
          blurb: 'Voluntarily signing up for a prison of silence is one thing, but actually following through with it takes a lot of courage.',
          source: 'https://thelinknewspaper.ca/article/vipassana-meditation-is-the-craziest-shit-youll-ever-do'
        },
        {
          name: 'How do I start meditating?',
          image: "https://www.theglobeandmail.com/resizer/UB3eh2paW3d67U0jomUosF6gJ9o=/620x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/X53FIN6HXBEK7A4N2A7WGOYSPU.jpg",
          blurb: "Meditation is said to relieve stress, improve concentration, increase happiness and even slow aging! Sign me up, I thought, happily. It's the elixir I've been searching for.",
          source: "https://www.theglobeandmail.com/life/health-and-fitness/health/how-do-i-start-meditating/article37700869/"
        },
        {
          name: "Meditation and yoga can 'reverse' DNA reactions which cause stress, new study suggests.",
          image: "https://www.sciencedaily.com/images/2017/06/170615213301_1_540x360.jpg",
          blurb: "Mind-body interventions (MBIs) such as meditation, yoga and Tai Chi don't simply relax us; they can 'reverse' the molecular reactions in our DNA which cause ill- health and depression, according to a study.",
          source: 'https://www.sciencedaily.com/releases/2017/06/170615213301.htm'
        },
      ]
    }
  }

  renderArticles(article) {
    return (
      <div>
        <div className='articleContainer'>
          <div className='articleLeft'>
            <div className='articleName'><a href={article.source}>{article.name}</a></div>
            <img className='articleImage' src={article.image}></img>
          </div>
          <div className='articleRight'>
            {article.blurb}
          </div>
        </div>
        <div className='borderBottom'></div>
      </div>
    )
  }

  render() {


    return (
      <div>
        <div className='articlesContainer'>
          {this.state.articles.map(article =>
            this.renderArticles(article)
            )
          }
        </div>
      </div>

    )
  }
}

export default Articles
