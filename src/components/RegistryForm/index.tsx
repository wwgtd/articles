import React from "react";
import "./style.css";
import {
  writeLoginError,
  resetIsRegistrySuccess
} from "../../actions/userActions";
import { IUsersState } from "../../types/redux/users";
import { api } from "../../actions/api";
import { connect } from "react-redux";

interface IRegisterState {
  email: string;
  password: string;
  name: string;
  successText: string;
}

interface IRegisterProps {
  register: (payload: {
    name: string;
    password: string;
    email: string;
  }) => boolean;
  writeError: (error: string) => void;
  resetIsRegistrySuccess: () => void;

  users: IUsersState;
}

class RegistryForm extends React.PureComponent<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);
    this.state = { name: "", email: "", password: "", successText: "" };
  }

  componentDidMount() {
    this.props.writeError("");
    this.props.resetIsRegistrySuccess();
  }

  componentDidUpdate() {
    if (this.props.users.isRegistrySuccess === true) {
      this.setState({ ...this.state, successText: "success" });
      setTimeout(() => this.props.resetIsRegistrySuccess(), 1000);
    } else if (this.props.users.isRegistrySuccess === false) {
      this.setState({ ...this.state, successText: "" });
    }
  }

  handleInput = (e: any) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

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
      this.props.register(this.state);
    }
  };

  render() {
    return (
      <form className="register_form" onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Register" />
        {this.props.users.errors ? (
          <p className="login_error"> {this.props.users.errors} </p>
        ) : (
          undefined
        )}
        <p className="success_login"> {this.state.successText} </p>
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
    writeError: (error: string) => dispatch(writeLoginError(error)),
    resetIsRegistrySuccess: () => dispatch(resetIsRegistrySuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistryForm);
