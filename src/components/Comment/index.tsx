import React, { useState, useCallback, useEffect } from "react";
import "./style.less";
import { api } from "../../actions/api";
import { connect } from "react-redux";

enum CommentDisplayStatus {
  Default = 0,
  CommentUpdate
}

interface ICommentProps {
  updateComment: (params: { id: number; body: string }) => void;
  getArticle: (article_id: number) => void;

  article_id: number;
  isLoggedAdmin: boolean;
  username: string;
  body: string;
  created_at: string;
  idx: number;
  id: number;
}


const Comment = React.memo((props: ICommentProps) => {
  let [commentBody, setCommentBody] = useState(props.body);
  let [displayStatus, setDisplayStatus] = useState(CommentDisplayStatus.Default);

  useEffect( () => {
    setCommentBody(props.body)
  }, [props.body]);

  const changeDisplay = useCallback(() => {
    const newStatus = displayStatus === CommentDisplayStatus.Default
        ? CommentDisplayStatus.CommentUpdate
        : CommentDisplayStatus.Default;
    setDisplayStatus(newStatus);
  }, [displayStatus]);

  const handleInput = useCallback((e) => {
    setCommentBody(e.target.value);
  }, [])


  const submitCommentUpdate = useCallback( (e) => {
    e.preventDefault();
    props.updateComment({
      body: commentBody,
      id: props.id
    });
    changeDisplay();
    props.getArticle(props.article_id);
  }, [commentBody, props, changeDisplay]);

  return (
    <>
      <div className="article_comment_author">
        <span> {props.username} </span>
        {props.isLoggedAdmin ? (
          <button
            className="edit_comment_btn common_button"
            onClick={changeDisplay}
          >
            Edit
          </button>
        ) : null}
      </div>
      <div className="article_comment_body">
        <div className="article_comment_body_created_at">
          <span className="comment_idx">{props.idx}</span>
          <span className="comment_date">{props.created_at}</span>
        </div>
      { (displayStatus === CommentDisplayStatus.Default) ? (
          <div className="article_comment_body_message">
            {props.body}
          </div>
        ) : (
          <form
            className="update_article_form"
            onSubmit={submitCommentUpdate}
          >
            <div className="update_article_form_body">
            <textarea
                rows={5}
                cols={80}
                name="commentBody"
                value={commentBody}
                onChange={handleInput}
              />
            </div>
          <input
              className="update_article_form_submit_btn common_button"
              type="submit"
              value="Update comment"
           />
          </form>
        )}
      </div>
    </>
  );
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateComment: (params: { id: number; body: string }) => {
      dispatch(api.comments.update(params))
    },
    getArticle: (article_id: number) =>
      dispatch(api.articles.getOne(article_id))
  };
};

export default connect(null, mapDispatchToProps)(Comment);
