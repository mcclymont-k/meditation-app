import React, { Component } from 'react';

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
          name: 'Article 2',
          image: 'href',
          blurb: 'QWERtyuiop',
          source: ''
        },
        {
          name: 'Article 3',
          image: 'href',
          blurb: 'QWERtyuiop',
          source: ''
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
