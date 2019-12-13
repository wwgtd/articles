import React from 'react'
import './style.css'
import { IUsersState, IAuthData } from "../../types/redux/users"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { api, clearMockData } from '../../actions/api'

interface IHeaderProps {
  users: IUsersState,
  logout: (data: IAuthData) => void
}


const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <header>
      <div className='headerInformation'>
        <Link className='linkArticles' to='/articles' > Articles </Link>
        <button className='clear_mock_data_btn' onClick={() => { clearMockData();}}> Clear mock data </button>

       </div>
      <div className='headerLogin'>
      { props.users.user_data ?
        <div>
          <div className="login_info">Your account: <span> {props.users.user_data.name}</span></div>
          <button className='header_logout' onClick={ () => props.logout(props.users.auth_data!) }> Logout </button>
        </div>
        :
        <div>
          <Link to='/login' className="loginLogin" >Login</Link>
          <Link to='/registry' className="loginSignup">SignUp</Link>
        </div>
        }
      </div>
    </header>
  );
}

const mapStateToProps = (state: any) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (data: IAuthData) => dispatch(api.users.logout(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
