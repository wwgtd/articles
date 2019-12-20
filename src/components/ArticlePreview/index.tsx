import React from "react";
import "./style.css";
import { IUsersState } from "../../types/redux/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { api } from "../../actions/api";

interface IArticlePreviewProps {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  categoryName: string;
  delete: (id: number) => void;
  users: IUsersState;
}

const ArticlePreview = React.memo((props: IArticlePreviewProps) => {
  let isLogged = false;
  if (props.users.user_data !== null) {
    isLogged = props.users.user_data.access_level === "10" ? true : false;
  }
  return (
    <Link to={`/articles/${props.id}`} className="article_preview">
      <div className="article_preview_title">
        {props.title || "title"}
        {isLogged ? (
          <button
            type="button"
            onClick={() => props.delete(props.id)}
            className="delete_article_btn"
          >
            delete
          </button>
        ) : null}
      </div>
      <div className="article_preview_ceil">
        {props.categoryName}
      </div>
      <div className="article_preview_ceil">
        {props.created_at}
      </div>
    </Link>
  );
});

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    delete: (id: number) => dispatch(api.articles.delete(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);
