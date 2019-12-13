import React from 'react'
import ArticleList from '../../containers/ArticleList'
import Header from '../../components/Header'
import EditCategoriesForm from '../../components/EditCategoriesForm'
import CreateArticleForm from '../../components/CreateArticleForm'
import { ArticlesPreviewButtons } from '../../components/ArticlesPreviewButtons'
import { IUsersState } from '../../types/redux/users'
import { connect } from 'react-redux'

enum DisplayStatus {
  Default = 0,
  CreateNewArticle,
  EditCategories
}

interface ArticlePreviewListPageProps {
  users: IUsersState
}

interface ArticlesPreviewListPageState {
  display: DisplayStatus
}

class ArticlesPreviewListPage extends React.PureComponent<ArticlePreviewListPageProps, ArticlesPreviewListPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      display: DisplayStatus.Default
    };
  }

  changeDisplay = (status: DisplayStatus) => {
    this.setState({display: status});
  }

  render() {
    let isLogged = false;
    if (this.props.users.user_data !== null) {
      isLogged = this.props.users.user_data.access_level === "10" ? true : false
    };
    return (
    <div className="article_preview_list_page">
      <Header />
      <ArticleList />
      { isLogged ? <ArticlesPreviewButtons createNewArticle={() => this.changeDisplay(DisplayStatus.CreateNewArticle)}
        editCategories={() => this.changeDisplay(DisplayStatus.EditCategories)}/> : null }
      { this.state.display === DisplayStatus.EditCategories ? <EditCategoriesForm onClick={() => this.changeDisplay(DisplayStatus.Default)} /> : null}
      { this.state.display === DisplayStatus.CreateNewArticle ? <CreateArticleForm onClick={() => this.changeDisplay(DisplayStatus.Default)} /> : null}
    </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(ArticlesPreviewListPage)
