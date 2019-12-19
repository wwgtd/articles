import React from "react";
import "./style.css";
import ArticlePreview from "../../components/ArticlePreview";
import { IArticlesState } from "../../types/redux/articles";
import { ICategoriesState } from "../../types/redux/category";
import { connect } from "react-redux";
import { api } from "../../actions/api";

interface IArticleListProps {
  articles: IArticlesState;
  categories: ICategoriesState;
  getArticles: () => void;
  getCategories: () => void;
}

class ArticleList extends React.PureComponent<IArticleListProps> {
  constructor(props: IArticleListProps) {
    super(props);
    props.getCategories();
    props.getArticles();
  }

  getCategoryNameByArticleIdx = (index: string) => {
    if (this.props.categories === undefined) return "";
    let idxOfCategory = this.props.articles.data[index].category_id;
    return this.props.categories.data[idxOfCategory] === undefined
      ? "category was deleted or undefined"
      : this.props.categories.data[idxOfCategory].name;
  };

  render() {
    if (Object.keys(this.props.articles.data).length < 1) {
      return (
        <div className="article_list_locked">
          <p className="article_list_locked_text">
            {" "}
            create article, please (article creation will be available after
            authorization)
          </p>
        </div>
      );
    }

    const articles = this.props.articles.data; // to reduce code
    return (
      <div className="article_preview_list">
        <div className="article_preview_header">
          <div className="article_preview_title_header">
            <span> title </span>
          </div>
          <div className="article_preview_header_ceil">
            <span className="article_preview_header_title">category</span>
          </div>
          <div className="article_preview_header_ceil">
            <span className="article_preview_header_title">created at</span>
          </div>
        </div>
        {Object.keys(articles).map(cur => {
          return (
            <ArticlePreview
              key={Number(cur)}
              id={Number(cur)}
              created_at={articles[cur!].created_at || "not defined"}
              updated_at={articles[cur!].updated_at || "not defined"}
              categoryName={this.getCategoryNameByArticleIdx(cur)}
              title={articles[cur!].title}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    articles: state.articles,
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getArticles: () => dispatch(api.articles.getAll()),
    getCategories: () => dispatch(api.category.get())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
