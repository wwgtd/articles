import React from "react";
import "./style.css";
import { api } from "../../actions/api";
import { connect } from "react-redux";

enum CommentDisplayStatus {
  Default = 0,
  CommentUpdate
}

interface ICommentProps {
  updateComment: (params: { id: number; body: string }) => void;
  updateArticle: () => void;

  isLoggedAdmin: boolean;
  username: string;
  body: string;
  created_at: string;
  idx: number;
  id: number;
}

interface ICommentState {
  commentBody: string;
  display: CommentDisplayStatus;
}

class Comment extends React.PureComponent<ICommentProps, ICommentState> {
  constructor(props: ICommentProps) {
    super(props);
    this.state = {
      commentBody: props.body,
      display: CommentDisplayStatus.Default
    };
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.body !== prevProps.body) {
      this.setState({ ...this.state, commentBody: this.props.body });
    }
  }

  changeDisplay = () => {
    let status =
      this.state.display === CommentDisplayStatus.Default
        ? CommentDisplayStatus.CommentUpdate
        : CommentDisplayStatus.Default;
    this.setState({ ...this.state, display: status });
  };

  handleInput = (e: any) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });

  submitCommentUpdate = (e: any) => {
    e.preventDefault();
    this.props.updateComment({
      body: this.state.commentBody,
      id: this.props.id
    });
    this.changeDisplay();
    this.props.updateArticle();
  };

  render() {
    return (
      <>
        <div className="article_comment_author">
          <span> {this.props.username} </span>
          {this.props.isLoggedAdmin ? (
            <button
              className="edit_comment_btn"
              onClick={() => this.changeDisplay()}
            >
              Edit
            </button>
          ) : null}
        </div>
        <div className="article_comment_body">
          <div className="article_comment_body_created_at">
            <span className="comment_idx">{this.props.idx}</span>
            <span className="comment_date">{this.props.created_at}</span>
          </div>
          {this.state.display === CommentDisplayStatus.Default ? (
            <div className="article_comment_body_message">
              {this.props.body}
            </div>
          ) : (
            <form
              className="update_article_form"
              onSubmit={this.submitCommentUpdate}
            >
              <div className="update_article_form_body">
                <textarea
                  rows={5}
                  cols={80}
                  name="commentBody"
                  value={this.state.commentBody}
                  onChange={this.handleInput}
                />
              </div>
              <input
                className="update_article_form_submit_btn"
                type="submit"
                value="Update comment"
              />
            </form>
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateComment: (params: { id: number; body: string }) =>
      dispatch(api.comments.update(params))
  };
};

export default connect(null, mapDispatchToProps)(Comment);
