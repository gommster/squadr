import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser, logout} from '../../redux/reducer'

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
    console.log('mounted props: ', this.props)
    this.setState({});
  }

  async getUser() {
    await axios.get(`/api/profile/${this.props.id}`)
    .then(res =>  {console.log( 'GET USER RESPONSE : ',res.data) 
    return updateUser(res.data)})
    this.render();
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => logout())
  }

  render() {
    return (this.props.location.pathname === '/dash' || this.props.location.pathname === '/profile') &&
      <div className='nav'>
        <div className='left-side'>
          <div className='nav-profile-container'>
            <Link to="/profile"><div className='nav-profile-pic' style={{backgroundImage: `url('${this.props.profile_pic}')`}}></div></Link>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
            <Link to="/dash"><img className='nav-img' src={homeLogo} alt='home' /></Link>
          </div>
        </div>
        <div className='right-side'>
          <Link to="/" onClick={this.logout}><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        </div>
      </div>
  }
}

function mapStateToProps(state){
  return state;
}
export default withRouter(connect(mapStateToProps, {updateUser: updateUser, logout: logout})(Nav))