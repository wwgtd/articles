import React from "react";
import Article from "../../containers/Article";
import Header from "../../components/Header";
import { IArticlesState } from "../../types/redux/articles";
import { connect } from "react-redux";

interface IArticlePageProps {
  articles: IArticlesState;
  match: any;
}

const ArticlePage = React.memo((props: IArticlePageProps) => {
  return (
    <>
      <Header articles={props.articles} />
      <Article article_id={props.match.params.id} articles={props.articles} />
    </>
  );
});

const mapStateToProps = (state: any) => {
  return {
    articles: state.articles
  };
};

export default connect(mapStateToProps, null)(ArticlePage);
