import React from 'react'
import './style.css'
import {writeLoginError} from "../../actions/userActions"

import { IUsersState } from "../../types/redux/users"
import { Redirect } from 'react-router'

import { connect } from 'react-redux'
import { api } from '../../actions/api'


interface ILoginProps {
  login: (params: {email: string, password: string}) => boolean,
  writeError: (error: string) => void,

  users: IUsersState,
}

interface ILoginState {
  email: string,
  password: string
}

class LoginForm extends React.PureComponent<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {email: "", password: ""}
  }

  handleInput = (e: any) => this.setState({...this.state, [e.target.name]: e.target.value})

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  componentDidMount() {
    this.props.writeError("");
  }

  render() {
    if (this.props.users.user_data !== null) { return <Redirect to='/articles' /> }
    else {
      return(
        <>
          <form className="loginForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='email'> Email: </label>
              <input type='text' name='email' value={this.state.email} onChange={this.handleInput} />
            </div>
            <div>
              <label htmlFor='password'> Password: </label>
              <input type='password' name='password' value={this.state.password} onChange={this.handleInput} />
            </div>
              <input type="submit" value="Login" />
              {this.props.users.errors ? <p className='loginError'> {this.props.users.errors} </p> : undefined}
          </form>
        </>
      )
    }}
}

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: {email: string, password: string}) : boolean => dispatch(api.users.login(payload)),
    writeError: (error: string) => dispatch(writeLoginError(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
