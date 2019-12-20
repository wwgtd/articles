import React from "react";
import "./style.css";
import { IUsersState, IAuthData } from "../../types/redux/users";
import { Link } from "react-router-dom";
import { IArticlesState } from "../../types/redux/articles";
import { connect } from "react-redux";
import { api, clearMockData } from "../../actions/api";

interface IHeaderProps {
  users: IUsersState;
  articles?: IArticlesState;

  logout: (data: IAuthData) => void;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const re = /^.*\/articles\/[\d]+$/;
  let title: string | undefined;
  let location = window.location.href;
  if (re.test(location)) {
    title =
      props.articles!.current !== undefined
        ? props.articles!.current!.title
        : undefined;
    let relHrefStart = location.search(/\/articles\//);
    location = location.slice(relHrefStart);
  } else title = undefined;

  return (
    <header>
      <div className="header_information">
        <div className="header_curved_button">
          <Link to="/articles">{"Articles"}</Link>
        </div>
        {title !== undefined ? (
          <div className="header_curved_button">
            <Link to={location}>{title}</Link>
          </div>
        ) : null}
      </div>
      <div className="header_login_btns">
        {props.users.user_data ? (
          <>
            <button
              className="clear_mock_data_btn"
              onClick={() => {
                clearMockData();
              }}
            >
              Clear data
            </button>
            <button disabled type="button" className="login_info">
              Your account: {props.users.user_data.name}
            </button>
            <button
              className="header_logout"
              onClick={() => props.logout(props.users.auth_data!)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="clear_mock_data_btn"
              onClick={() => {
                clearMockData();
              }}
            >
              Clear data
            </button>
            <Link to="/login">
              <button className="login_signin" type="button">
                Login
              </button>
            </Link>
            <Link to="/registry">
              <button className="login_signup" type="button">
                SignUp
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (data: IAuthData) => dispatch(api.users.logout(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
