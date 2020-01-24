import React from "react";
import "./style.less";
import { Link } from "react-router-dom";

interface IArticlePreviewProps {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  categoryName: string;
}

const ArticlePreview = (props: IArticlePreviewProps) => {
  return (
    <Link to={`/articles/${props.id}`} className="article_preview">
      <div className="article_preview_title">
        {props.title || "title"}
      </div>
      <div className="article_preview_ceil">
        {props.categoryName}
      </div>
      <div className="article_preview_ceil">
        {props.created_at}
      </div>
    </Link>
  );
};

export default ArticlePreview;
