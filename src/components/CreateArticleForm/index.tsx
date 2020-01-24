import React from "react";
import "./style.less";
import { ICategoriesState } from "../../types/redux/category";
import { connect } from "react-redux";
import { api } from "../../actions/api";

interface ICreateArticleFromProps {
  categories: ICategoriesState;
  onClick: () => void;
  create: (data: { body: string; title: string; category_id: number }) => void;
}

interface ICreateArticleFromState {
  body: string;
  title: string;
  category_id: number;
  ok: boolean;
}

class CreateArticleForm extends React.PureComponent<
  ICreateArticleFromProps,
  ICreateArticleFromState
> {
  constructor(props: ICreateArticleFromProps) {
    super(props);
    this.state = { body: "", title: "", category_id: -1, ok: false };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      category_id: parseInt(Object.keys(this.props.categories.data)[0])
    });
  }

  handleInput = (e: any) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.create({
      title: this.state.title,
      body: this.state.body,
      category_id: this.state.category_id
    });
    this.props.onClick();
  };

  render() {
    return (
      <div className="create_article_frame">
        <div className="frame_close_btn_wrapper">
          <button className="frame_close_btn" onClick={this.props.onClick}>
            x
          </button>
        </div>

        <div className="create_article_form">
          <form onSubmit={this.handleSubmit}>
            <div className="create_article_form_select">
              <label htmlFor="category"> Select category </label>
              <select
                value={this.state.category_id}
                name="category_id"
                onChange={this.handleInput}
              >
                {Object.keys(this.props.categories.data).map(cur => {
                        return (
                        <option key={cur} value={cur}>
                          {this.props.categories.data[cur].name}
                        </option>
                      );
                  })}
              </select>
            </div>
            <div className="create_article_form_title">
                <label htmlFor="title"> Title </label>
                <input
                  className="title_input"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInput}
                />
            </div>
            <div className="create_article_form_body">
              <label htmlFor="body"> Body</label>
              <textarea
                rows={13}
                cols={45}
                name="body"
                value={this.state.body}
                onChange={this.handleInput}
              />
            </div>
            <input
              className="create_article_form_submit_btn common_button"
              type="submit"
              value="Create article"
            />
            {this.state.ok ? <p className="ok"> OK </p> : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    create: (data: { body: string; title: string; category_id: number }) =>
      dispatch(api.articles.create(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticleForm);
