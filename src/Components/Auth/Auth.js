import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../assets/group_add-white-48dp.svg'
import './Auth.css';
import {connect} from 'react-redux';
import {updateUser} from '../../redux/reducer';
import {Link} from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMsg: ''
    }
    this.login = this.login.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  async login() {
    console.log('STATE: ', this.props)

    await axios.post('/api/auth/login', this.state)
      .then(res => {
        console.log('LOGIN RES DATA: ', res.data)
        this.props.updateUser({id: res.data.id, username: res.data.username, profile_pic: res.data.profile_pic});
        this.props.history.push('/dash')
        console.log('Response: ',res);
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Incorrect username or password!'})
      })
      console.log(this.state)
  }

  closeErrorMessage = () => {
    this.setState({
      errorMsg: false, 
      username: '', 
      password: ''
    })
  }

  render() {
    return (
      <div className='auth'>
        <div className='auth-container'>
          <img src={logo} alt='logo' id='logo' />
          <h1 className='auth-title'>SQUADR</h1>
          {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
          <div className='auth-input-box'>
            <p>USERNAME:</p>
            <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          </div>
          <div className='auth-input-box'>
            <p>PASSWORD:</p>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <div className='auth-button-container'>
            <button className='dark-button' onClick={this.login}> LOGIN </button>
            <Link to='/reg'><button className='dark-button'> REGISTER </button></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, {updateUser: updateUser})(Auth)
