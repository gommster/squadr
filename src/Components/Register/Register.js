import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';
import {connect} from 'react-redux';
import {updateUser} from '../../redux/reducer';
import {Link, withRouter} from 'react-router-dom';
import Photos from '../Photos/photos'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      description: '',
      isRat: true, isChad: true, isHatchling: true, isLabs: true, isShoreline: true, isCustoms: true, isWoods: true, isFactory: true, isInterchange: true, isReserve: true, isMoneyMaking: true,
        isSherpa: true, isNeedsSherpa: true, isScav: true, isQuesting: true, isCasual: true, isSerious: true,
      profile_pic: '',
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
      errorMsg: ''
    }
    this.register = this.register.bind(this);
  }

  setPhotos = (photos) => {
    this.setState({photo1: photos[0], photo2: photos[1], photo3: photos[2], photo4: photos[3], photo5: photos[4]})
    console.log('STATE AFTER PHOTOS ARE SET: ',this.state)
}


  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  register() {
    axios.post('/api/auth/register', this.state)
      .then(res => {
        console.log('RESPONSED!!!!!!!!!!!!!')
        this.props.history.push('/')
        updateUser(res.data);
      })
      .catch(err => {
        console.log('CAUGHT!!!!!!!!!!!!!')
        console.log(err)
        this.setState({errorMsg: 'Username taken!'})
      })
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
      <div className='reg'>
        <div className='photos'>
          <h1> REGISTER FOR SQUADR!</h1>
          <Photos setPhotos={this.setPhotos}/>
        </div>
        <div className='information'>
          <div className='content-box tags-filter'>
            <p>Check off which tags apply to you and your playstyle. This is what other users will be searching for.</p>
            <div className='dash-check-box'><p>Rat</p><input checked={this.state.isRat} onChange={_ => this.setState({ isRat: !this.state.isRat }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Chad</p><input checked={this.state.isChad} onChange={_ => this.setState({ isChad: !this.state.isChad }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Hatchling</p><input checked={this.state.isHatchling} onChange={_ => this.setState({ isHatchling: !this.state.isHatchling }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Labs</p><input checked={this.state.isLabs} onChange={_ => this.setState({ isLabs: !this.state.isLabs }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Shoreline</p><input checked={this.state.isShoreline} onChange={_ => this.setState({ isShoreline: !this.state.isShoreline }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Customs</p><input checked={this.state.isCustoms} onChange={_ => this.setState({ isCustoms: !this.state.isCustoms }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Woods</p><input checked={this.state.isWoods} onChange={_ => this.setState({ isWoods: !this.state.isWoods }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Factory</p><input checked={this.state.isFactory} onChange={_ => this.setState({ isFactory: !this.state.isFactory }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Interchange</p><input checked={this.state.isInterchange} onChange={_ => this.setState({ isInterchange: !this.state.isInterchange }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Reserve</p><input checked={this.state.isReserve} onChange={_ => this.setState({ isReserve: !this.state.isReserve }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Money Making</p><input checked={this.state.isMoneyMaking} onChange={_ => this.setState({ isMoneyMaking: !this.state.isMoneyMaking }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Sherpa</p><input checked={this.state.isSherpa} onChange={_ => this.setState({ isSherpa: !this.state.isSherpa }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Scav</p><input checked={this.state.isScav} onChange={_ => this.setState({ isScav: !this.state.isScav }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Questing</p><input checked={this.state.isQuesting} onChange={_ => this.setState({ isQuesting: !this.state.isQuesting }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Casual</p><input checked={this.state.isCasual} onChange={_ => this.setState({ isCasual: !this.state.isCasual }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Serious</p><input checked={this.state.isSerious} onChange={_ => this.setState({ isSerious: !this.state.isSerious }, this.getProfiles)} type='checkbox' /></div>
            <div className='dash-check-box'><p>Needs Sherpa</p><input checked={this.state.isNeedsSherpa} onChange={_ => this.setState({ isNeedsSherpa: !this.state.isNeedsSherpa }, this.getProfiles)} type='checkbox' /></div>
          </div>
          <div className='description-box'><textarea onChange={e => this.handleChange('description', e.target.value)} placeholder='Type anything you want here that you think will make others want to play with you!'></textarea></div>
          <div className='error-statement'>{this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}</div>
          <div className='auth-input-box'>
            <p>USERNAME:</p>
            <input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} />
          </div>
          <div className='auth-input-box'>
            <p>PASSWORD:</p>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <button onClick={this.register}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps, {updateUser: updateUser})(Register)