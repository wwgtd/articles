import React from 'react'
import './style.css'
import Comment from '../../components/Comment/'
import { IUsersState } from '../../types/redux/users'
import { IArticlesState } from '../../types/redux/articles'
import { ICommentsState, IComment } from '../../types/redux/comments'
import { connect } from 'react-redux'
import { api } from '../../actions/api'

enum ArticleDisplayStatus {
  Default = 0,
  ArticleUpdate
}

interface IArticleProps {
  getArticle: (id: number) => void,
  updateArticle: (params: {id: number, body: string}) => void,
  createComment: (params: {article_id: number, body: string}) => void,

  article_id: number,
  articles: IArticlesState,
  comments: ICommentsState,
  users: IUsersState
}

interface IArticleState {
  display: ArticleDisplayStatus,
  articleBody: string,
  commentBody: string
}


class Article extends React.PureComponent<IArticleProps, IArticleState> {
  constructor(props: IArticleProps) {
    super(props);
    this.props.getArticle(this.props.article_id);
    this.state = {display: ArticleDisplayStatus.Default, articleBody: "", commentBody: ""};
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.articles.current !== prevProps.articles.current) {
      this.setState({...this.state, articleBody: this.props.articles!.current!.body})
    }
  }

  handleInput = (e: any) => this.setState({...this.state, [e.target.name]: e.target.value})

  submitArticleUpdate = (e: any) => {
    e.preventDefault();
    this.props.updateArticle({body: this.state.articleBody, id: this.props.article_id});
    this.props.getArticle(this.props.article_id);
    this.changeDisplay();
  }

  submitCommentCreate = (e: any) => {
    e.preventDefault();
    this.props.createComment({article_id: this.props.article_id, body: this.state.commentBody});
    this.setState({...this.state, commentBody: ""})
    this.props.getArticle(this.props.article_id);
  }

  changeDisplay = () => {
    let status = this.state.display === ArticleDisplayStatus.Default ? ArticleDisplayStatus.ArticleUpdate : ArticleDisplayStatus.Default;
    this.setState({...this.state, display: status});
  }

  render() {
    let isLoggedAdmin = false;
    if (this.props.users.user_data !== null) {
      isLoggedAdmin = this.props.users.user_data.access_level === "10" ? true : false }

    const isLogged = this.props.users.user_data !== null ? true : false

    let article = this.props.articles.current;
    if (article) {
      return (
        <div className='article_page'>

          <div className='article'>
            <div className='articleHeader'>
              <div className='articleAuthor'> Author </div>
              <div className='articleTitle'> {article.title} </div>
            </div>

            <div className='article_messages'>

              <div className='article_starter_message'>
                <div className='article_starter_message_author'> Article Starter</div>
                <div className='article_starter_message_body'>
                  <div className='article_starter_message_body_created_at'>
                    <span style={{float: 'right'}}> {article.created_at} </span>
                    { isLoggedAdmin ? <button className="starter_post_btn_edit" onClick={() => this.changeDisplay()}>Edit article</button> : null }
                  </div>
                  {this.state.display === ArticleDisplayStatus.Default ? <div className='article_starter_message_body_message'> {article.body} </div> :
                    <form className='update_article_form' onSubmit={this.submitArticleUpdate}>
                      <div className='update_article_form_body'>
                        <textarea name='articleBody' value={this.state.articleBody} onChange={this.handleInput} />
                      </div>
                      <input className="update_article_form_submit_btn" type="submit" value="Update article" />
                    </form>}
                </div>
              </div>

              <div className='comments_list'>
              {article.comments!.map( (cur: IComment, idx: number) => {
                return <Comment updateArticle={() => this.props.getArticle(this.props.article_id)} isLoggedAdmin={isLoggedAdmin} id={cur.id} key={idx}
                idx={idx} username={cur.user!.name} body={cur.body} created_at={cur.created_at} />}
                )}
              </div>
            </div>
          </div>

        { isLogged ?
        <form className="article_create_comment_form" onSubmit={this.submitCommentCreate}>
          <div className='article_create_comment_input'>
            <textarea rows={10} cols={80} name='commentBody' value={this.state.commentBody} onChange={this.handleInput} />
          </div>
          <input className="article_create_comment_submit_btn" type="submit" value="Submit comment" />
        </form> : null }

    </div>

      )
    } else return <p> error </p>
  }
}

const mapStateToProps = (state: any) => {
  return {
    articles: state.articles,
    comments: state.comments,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getArticle: (id: number) => dispatch(api.articles.getOne(id)),
    updateArticle: (params: {id: number, body: string}) => dispatch(api.articles.update(params)),
    createComment: (params: {article_id: number, body: string}) => dispatch(api.comments.create(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
