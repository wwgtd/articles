import React from "react";
import "./style.css";
import { IUsersState, IAuthData } from "../../types/redux/users";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { api, clearMockData } from "../../actions/api";

interface IHeaderProps {
  users: IUsersState;
  logout: (data: IAuthData) => void;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <header>
      <div className="headerInformation">
        <Link to="/articles">
          <button className="linkArticles" type="button"> Articles </button>
        </Link>
      </div>
      <div className="headerLogin">
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
            <button type="button" className="login_info">
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
              <button className="loginLogin" type="button">
                Login
              </button>
            </Link>
            <Link to="/registry">
              <button className="loginSignup" type="button">
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
