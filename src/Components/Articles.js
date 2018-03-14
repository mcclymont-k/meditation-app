import React, { Component } from 'react';

class Articles extends Component {
  constructor() {
    super()
    this.state = {
      articles: [
        {
          name: 'Article 1',
          image: 'href',
          blurb: 'QWERtyuiop',
        },
        {
          name: 'Article 2',
          image: 'href',
          blurb: 'QWERtyuiop',
        },
        {
          name: 'Article 3',
          image: 'href',
          blurb: 'QWERtyuiop',
        },
      ]
    }
  }

  renderArticles(article) {
    return (
      <div>
        <div className='articleContainer'>
          <div className='articleLeft'>
            <div className='articleName'><p>{article.name}</p></div>
            <div className='articleImage'>{article.image}</div>
          </div>
          <div className='articleRight'>
            <h1>Blurb</h1>
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
