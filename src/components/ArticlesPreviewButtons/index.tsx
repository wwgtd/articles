import React from "react";
import "./style.less";

interface IArticlesPreviewButtonsProps {
  createNewArticle: () => void;
  editCategories: () => void;
}

export const ArticlesPreviewButtons: React.FC<IArticlesPreviewButtonsProps> = (
  props: IArticlesPreviewButtonsProps
) => {
  return (
    <div className="article_preview_btns">
      <button onClick={props.createNewArticle} className="create_article_btn common_button">
        Create article
      </button>
      <button onClick={props.editCategories} className="edit_categories_btn common_button">
        Create or edit categories
      </button>
    </div>
  );
};
