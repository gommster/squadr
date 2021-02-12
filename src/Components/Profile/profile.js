import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './profile.css'
import {updateUser} from '../../redux/reducer';
import {Link, withRouter} from 'react-router-dom';
import Photos from '../Photos/photos'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      description: '',
      loading: true,
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

    this.saveProfile = this.saveProfile.bind(this);
  }

  async componentDidMount() {
    console.log('mounting Profile: ', this.props);
    await axios.get(`/api/profile/${this.props.id}`)
      .then(res => {
        console.log('GETPROFILE RESPONSE: ', res.data);
        let {username,password,description,isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory,
           isInterchange, isReserve, isMoneyMaking,isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious,profile_pic, photo1,
           photo2,photo3, photo4,  photo5
        } = res.data
        console.log(username,password,description,profile_pic, photo1,
          photo2,photo3, photo4,  photo5)
        this.setState({
          username: username,
          password: password,
          description: description,
          loading: false,
          isRat: res.data.israt, isChad: res.data.ischad, isHatchling: res.data.ishatchling, isLabs: res.data.islabs, 
          isShoreline: res.data.isshoreline, isCustoms: res.data.iscustoms,
           isWoods: res.data.iswoods, isFactory: res.data.isfactory, isInterchange: res.data.isinterchange, iseserve: res.data.isreserve, isMoneyMaking: res.data.ismoneymaking,
           isSherpa: res.data.issherpa, isNeedsSherpa: res.data.isneedssherpa, isScav: res.data.isscav, isQuesting: res.data.isquesting, isCasual: res.data.iscasual, isSerious: res.data.isserious,
          profile_pic: profile_pic,
          photo1: photo1,
          photo2: photo2,
          photo3: photo3,
          photo4: photo4,
          photo5: photo5,
      })
      console.log('STATE HAS BEEN SET',this.state)
    })
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

  saveProfile(){
  axios.put('/api/auth/saveProfile', this.state)
      .then(res => {
        console.log('RESPONSED!!!!!!!!!!!!!')
        this.props.history.push('/')
        updateUser(res.data);
      })
      .catch(err => {
        console.log(err)
      })
    }

  render() {
    let {loading} = this.state;
    let profile = 
    <div className='profile'>
      <div className='photos'>
        <Photos profilePhoto1={this.state.photo1} profilePhoto2={this.state.photo2} profilePhoto3={this.state.photo3}
        profilePhoto4={this.state.photo4} profilePhoto5={this.state.photo5} setPhotos={this.setPhotos}/>
      </div>
      <div className='information'>
        <div className='content-box tags-filter'>
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
        <div className='description-box'><textarea onChange={e => this.handleChange('description', e.target.value)} value={this.state.description}></textarea></div>
        <button onClick={this.saveProfile}>Submit</button>
      </div>
    </div>
    return (
      <div className='profileDIV'>
        <h1 style={{textAlign: "center"}}> {this.state.username}</h1>
        {!loading
            ?
            profile
            :
            <div className='load-box'>
              <div className='load-background'></div>
              <div className='load'></div>
            </div>
          } 
      </div>
    );
  }
}

function mapStateToProps(state){
return state;
}
export default connect(mapStateToProps, {updateUser: updateUser})(Profile)