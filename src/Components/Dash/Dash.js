import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Dash.css';

class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      isRat: true, isChad: true, isHatchling: true, isLabs: true, isShoreline: true, isCustoms: true, isWoods: true, isFactory: true, isInterchange: true, isReserve: true, isMoneyMaking: true,
              isSherpa: true, isNeedsSherpa: true, isScav: true, isQuesting: true, isCasual: true, isSerious: true,
      loading: true,
      photos: [],
      description: '',
      index: 0,
      displayPhoto: ''
    }

    this.getProfiles = this.getProfiles.bind(this);
    this.reset = this.reset.bind(this);
    this.squadUp = this.squadUp.bind(this);
    this.noThanks = this.noThanks.bind(this);
  }

  componentDidMount() {
    this.getProfiles();
    console.log('Dash mount:', this.state, this.props)
  }

  squadUp() {
    let {id} = this.props;
    console.log('SQUADUP ID: ', this.props, this.state.matches[this.state.index]);
    let isMatch = axios.put(`/api/profile/squadUp/${this.state.matches[this.state.index].id}&${id}`)
    this.setState({index: this.state.index+1, displayPhoto: ''});
  }

  noThanks() {
    this.setState({index: this.state.index+1});
  }

  getProfiles() {
    this.setState({index: 0})
    let {isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, 
      isCasual, isSerious} = this.state;
    let url = `/api/profile/all`;
    isRat ? url += '?isRat=true' : url += '?isRat=false';
    isChad ? url += '&isChad=true' : url += '&isChad=false';
    isHatchling ? url += '&isHatchling=true' : url += '&isHatchling=false';
    isLabs ? url += '&isLabs=true' : url += '&isLabs=false';
    isShoreline ? url += '&isShoreline=true' : url += '&isShoreline=false';
    isCustoms ? url += '&isCustoms=true' : url += '&isCustoms=false';
    isWoods ? url += '&isWoods=true' : url += '&isWoods=false';
    isFactory ? url += '&isFactory=true' : url += '&isFactory=false';
    isInterchange ? url += '&isInterchange=true' : url += '&isInterchange=false';
    isReserve ? url += '&isReserve=true' : url += '&isReserve=false';
    isMoneyMaking ? url += '&isMoneyMaking=true' : url += '&isMoneyMaking=false';
    isSherpa ? url += '&isSherpa=true' : url += '&isSherpa=false';
    isNeedsSherpa ? url += '&isNeedsSherpa=true' : url += '&isNeedsSherpa=false';
    isScav ? url += '&isScav=true' : url += '&isScav=false';
    isQuesting ? url += '&isQuesting=true' : url += '&isQuesting=false';
    isCasual ? url += '&isCasual=true' : url += '&isCasual=false';
    isSerious ? url += '&isSerious=true' : url += '&isSerious=false';
    
    axios.get(url)
      .then(res => {
        this.setState({ matches: res.data, loading: false})
        console.log(url, ' JUST GOT THIS INFO',res.data);
      })
  }

  reset() {
    let { myPosts } = this.state;
    let url = '/api/posts';
    if (myPosts) {
      url += '?mine=true';
    }
    axios.get(url)
      .then(res => {
        this.setState({ posts: res.data, loading: false, search: '', displayPhoto: this.state.matches[0].photo1 })
      })
  }

  render() {
    let {loading, isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, 
      isCasual, isSerious, matches } = this.state;
    let match = matches[this.state.index];
    let mappedProfile = '';
    if(match)
    {
    mappedProfile = 
       <div className='content-box dash-post-box' key={match.id}>
          <div className='photos'>
            <div className='displayPhoto'><img src={this.state.displayPhoto || match.photo1} width='100%' ></img></div>
            <div className='photoSelector' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <img src={match.photo1} alt="" onClick={_=>{this.setState({displayPhoto: match.photo1})}} width='19%' border='1px black solid'></img>
              <img src={match.photo2} alt="" onClick={_=>{this.setState({displayPhoto: match.photo2})}} width='19%' border='1px black solid'></img>
              <img src={match.photo3} alt="" onClick={_=>{this.setState({displayPhoto: match.photo3})}} width='19%' border='1px black solid'></img>
              <img src={match.photo4} alt="" onClick={_=>{this.setState({displayPhoto: match.photo4})}} width='19%' border='1px black solid'></img>
              <img src={match.photo5} alt="" onClick={_=>{this.setState({displayPhoto: match.photo5})}} width='19%' border='1px black solid'></img>
            </div>
          </div>
          <div className='profile-info'>
            <h3>{match.username}</h3>
            <p>{match.description}</p>
            <p>TAGS GO HERE</p>
            <div className='button-box'>
              <button onClick={this.noThanks}>No Thanks</button>
              <button onClick={this.squadUp}>Squad up!</button>
            </div>
          </div>
        </div>}
        else {
          mappedProfile = 
          <div>
            NO VALID MATCHES LEFT! SORRY!
          </div>
        }
    
    
    
    return (
      <div className='dash'>
        <div className='content-box tags-filter'>
          <p>SHOWING PROFILES WITH THESE EXACT TAGS: </p>
          <div className='dash-check-box'><p>Rat</p><input checked={isRat} onChange={_ => this.setState({ isRat: !isRat }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Chad</p><input checked={isChad} onChange={_ => this.setState({ isChad: !isChad }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Hatchling</p><input checked={isHatchling} onChange={_ => this.setState({ isHatchling: !isHatchling }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Labs</p><input checked={isLabs} onChange={_ => this.setState({ isLabs: !isLabs }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Shoreline</p><input checked={isShoreline} onChange={_ => this.setState({ isShoreline: !isShoreline }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Customs</p><input checked={isCustoms} onChange={_ => this.setState({ isCustoms: !isCustoms }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Woods</p><input checked={isWoods} onChange={_ => this.setState({ isWoods: !isWoods }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Factory</p><input checked={isFactory} onChange={_ => this.setState({ isFactory: !isFactory }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Interchange</p><input checked={isInterchange} onChange={_ => this.setState({ isInterchange: !isInterchange }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Reserve</p><input checked={isReserve} onChange={_ => this.setState({ isReserve: !isReserve }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Money Making</p><input checked={isMoneyMaking} onChange={_ => this.setState({ isMoneyMaking: !isMoneyMaking }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Sherpa</p><input checked={isSherpa} onChange={_ => this.setState({ isSherpa: !isSherpa }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Scav</p><input checked={isScav} onChange={_ => this.setState({ isScav: !isScav }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Questing</p><input checked={isQuesting} onChange={_ => this.setState({ isQuesting: !isQuesting }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Casual</p><input checked={isCasual} onChange={_ => this.setState({ isCasual: !isCasual }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Serious</p><input checked={isSerious} onChange={_ => this.setState({ isSerious: !isSerious }, this.getProfiles)} type='checkbox' /></div>
          <div className='dash-check-box'><p>Needs Sherpa</p><input checked={isNeedsSherpa} onChange={_ => this.setState({ isNeedsSherpa: !isNeedsSherpa }, this.getProfiles)} type='checkbox' /></div>
        </div>
        <div className='content-box dash-posts-container'>
          {!loading
            ?
            mappedProfile
            :
            <div className='load-box'>
              <div className='load-background'></div>
              <div className='load'></div>
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Dash);