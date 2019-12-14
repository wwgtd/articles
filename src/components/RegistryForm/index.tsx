import React from "react";
import "./style.css";
import { writeLoginError } from "../../actions/userActions";
import { IUsersState } from "../../types/redux/users";
import { api } from "../../actions/api";
import { connect } from "react-redux";

interface IRegisterState {
  email: string;
  password: string;
  name: string;
}

interface IRegisterProps {
  register: (payload: {
    name: string;
    password: string;
    email: string;
  }) => boolean;
  writeError: (error: string) => void;

  users: IUsersState;
}

class RegistryForm extends React.PureComponent<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  componentDidMount() {
    this.props.writeError("");
  }

  handleInput = (e: any) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.writeError("");

    const reEmail = new RegExp(
      "^[A-Za-z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$",
      "i"
    );
    const reUser = new RegExp("^[a-z0-9A-Z_-]{3,16}$");

    if (!reEmail.test(this.state.email)) {
      this.props.writeError("incorrect email");
    } else if (!reUser.test(this.state.name)) {
      this.props.writeError("incorrect username");
    } else {
      console.log("fdsfds");
      this.props.register(this.state);
    }
  };

  render() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <label htmlFor="name"> Username: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
          />
        </div>
        <div>
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
        </div>
        <input type="submit" value="Login" />
        {this.props.users.errors ? (
          <p className="loginError"> {this.props.users.errors} </p>
        ) : (
          undefined
        )}
        {this.props.users.isRegistrySuccess ? (
          <p className="success"> Successfully registered </p>
        ) : (
          undefined
        )}
      </form>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (payload: {
      name: string;
      password: string;
      email: string;
    }): boolean => dispatch(api.users.register(payload)),
    writeError: (error: string) => dispatch(writeLoginError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistryForm);
