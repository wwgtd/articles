import React from 'react'
import './style.css'
import ArticlePreview from '../../components/ArticlePreview'
import { ArticleListProps, ArticleListState } from '../../interfaces'

export default class ArticleList extends React.PureComponent<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps){
    super(props);
    this.state = {articles: undefined, categories: undefined};

    fetch('http://localhost/article/all').then(response => response.json())
    .then(data =>  {this.setState({articles: data})});

    fetch('http://localhost/category/all', {method: 'POST'}).then(response => response.json())
    .then(data => {this.setState({categories: data})});
  }

  getCategoryName = (index: string) => {
    if (this.state.categories === undefined)
      return '';
    return this.state.categories[`${this.state.articles[index].category_id}`].name
  };

  render() {
    if (this.state.articles === undefined)
     return [];

    const articles = this.state.articles; // to reduce code
    return (
    <div className='articlePreviewList'>

      <div className='articlePreviewHeader'>
        <div className='articlePreviewTitleHeader'> <b> title </b> </div>
        <div className='articlePreviewCategoryHeader'><b>category</b></div>
        <div className='articlePreviewCreated_atHeader'><b>created at</b></div>
        <div className='articlePreviewUpdated_atHeader'><b>last comment</b></div>
      </div>

      <div className='listOfArticlePreviews'>
        {Object.keys(articles).map((cur) => {
          return <ArticlePreview key={Number(cur)} id={Number(cur)}
          created_at={articles[cur].created_at ||'not defined'}
          updated_at={articles[cur].updated_at || 'not defined'}
          category_id={this.getCategoryName(cur)} body={articles[cur].body}
          title={articles[cur].title} />
        })}
      </div>

    </div>
    );
  }
}
