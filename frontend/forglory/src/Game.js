import React, { Component } from 'react';
import 'whatwg-fetch';
import './Game.css';

class Game extends Component {
    constructor(props) {
      super(props);

      this.state = {
        gameID: props.match.params.string,
        dataLoaded: false,
        gameFinished: true,
        playerOneID: 0,
        playerOneName: 'PPMD',
        playerOneRank: 1,
        playerOneScore: 3,
        playerOneChar: 'falco',
        playerOneImage: 'url',
        playerTwoID: 0,
        playerTwoName: 'Mang0',
        playerTwoRank: 2,
        playerTwoScore: 2,
        playerTwoChar: 'fox',
        playerTwoImage: 'url',
      };
    }

    update(responseJson) {
      document.title = 'For Glory';
      this.setState({
        dataLoaded: true,
        playerOneID: responseJson.userOne.id,
        playerOneName: responseJson.userOne.real_name,
        playerOneRank: responseJson.userOne.rank,
        playerOneScore: responseJson.userOne.score,
        playerOneChar: responseJson.userOne.main,
        playerOneImage: responseJson.userOne.image,
        playerTwoID: responseJson.userTwo.id,
        playerTwoName: responseJson.userTwo.real_name,
        playerTwoRank: responseJson.userTwo.rank,
        playerTwoScore: responseJson.userTwo.score,
        playerTwoChar: responseJson.userTwo.main,
        playerTwoImage: responseJson.userTwo.image,
      });
    }

    componentWillMount() {
      let url = 'http://api.forglory.net/match/' + this.state.gameID;
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        body: null
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.update(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    render() {
      if(this.state.dataLoaded) {
        return (
          <div className="landingContainer">
            <div className="topnav" id="myTopnav">
              <div className = 'logo' href="#home">
                <img className='logoPicture' src={require('./forglory.png')} />
              </div>
              <div className='linksNav'>
                <a href="/rankings">Rankings</a>
                <a href="/">Games</a>
              </div>
            </div>
            <div className='matchBody'>
              <div className="headToHead">
                <div className='playersContainer'>
                  <div className='leftPlayer'>
                    <div className='leftProfileContainer'>
                      <img className="profilePictureGame" src={this.state.playerTwoImage} />
                      <div className='playerInfo'>
                        <h1>{this.state.playerOneName}</h1>
                        <h3>Rank #{this.state.playerOneRank}</h3>
                      </div>
                    </div>
                    <div className='score'>{this.state.playerOneScore}</div>
                    {this.getChar(this.state.playerOneChar)}
                  </div>
                  <div className='divider' />
                  <div className='versus'>
                    <h1 className='vsText'>VS</h1>
                  </div>
                  <div className='rightPlayer'>
                    <div className='rightProfileContainer'>
                      <img className="profilePictureGame" src={this.state.playerTwoImage} />
                      <div className='playerInfo'>
                        <h1>{this.state.playerTwoName}</h1>
                        <h3>Rank #{this.state.playerTwoRank}</h3>
                      </div>
                    </div>
                    <div className='score'>{this.state.playerTwoScore}</div>
                    {this.getChar(this.state.playerTwoChar)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="landingContainer">
            <div className="topnav" id="myTopnav">
              <div className = 'logo' href="#home">
                <img className='logoPicture' src={require('./forglory.png')} />
              </div>
              <div className='linksNav'>
                <a href="/rankings">Rankings</a>
                <a href="/">Games</a>
              </div>
            </div>
          </div>
        );
      }
    }

    getChar(name) {
      switch (name) {
        case 'bowser': return (
          <img className="characterPic" src={require('./chars/bowserchar.png')} />
        );
        case 'dk': return (
          <img className="characterPic" src={require('./chars/dkchar.png')} />
        );
        case 'doc': return (
          <img className="characterPic" src={require('./chars/docchar.png')} />
        );
        case 'falco': return (
          <img className="characterPic" src={require('./chars/falcochar.png')} />
        );
        case 'falcon': return (
          <img className="characterPic" src={require('./chars/falconchar.png')} />
        );
        case 'fox': return (
          <img className="characterPic" src={require('./chars/foxchar.png')} />
        );
        case 'gw': return (
          <img className="characterPic" src={require('./chars/gwchar.png')} />
        );
        case 'ics': return (
          <img className="characterPic" src={require('./chars/icschar.png')} />
        );
        case 'kirby': return (
          <img className="characterPic" src={require('./chars/kirbychar.png')} />
        );
        case 'link': return (
          <img className="characterPic" src={require('./chars/linkchar.png')} />
        );
        case 'luigi': return (
          <img className="characterPic" src={require('./chars/luigichar.png')} />
        );
        case 'mario': return (
          <img className="characterPic" src={require('./chars/mariochar.png')} />
        );
        case 'marth': return (
          <img className="characterPic" src={require('./chars/marthchar.png')} />
        );
        case 'mewtwo': return (
          <img className="characterPic" src={require('./chars/mewtwochar.png')} />
        );
        case 'ness': return (
          <img className="characterPic" src={require('./chars/nesschar.png')} />
        );
        case 'peach': return (
          <img className="characterPic" src={require('./chars/peachchar.png')} />
        );
        case 'pichu': return (
          <img className="characterPic" src={require('./chars/pichuchar.png')} />
        );
        case 'pikachu': return (
          <img className="characterPic" src={require('./chars/pikachuchar.png')} />
        );
        case 'puff': return (
          <img className="characterPic" src={require('./chars/puffchar.png')} />
        );
        case 'samus': return (
          <img className="characterPic" src={require('./chars/samuschar.png')} />
        );
        case 'sheik': return (
          <img className="characterPic" src={require('./chars/sheikchar.png')} />
        );
        case 'ylink': return (
          <img className="characterPic" src={require('./chars/ylinkchar.png')} />
        );
        case 'yoshi': return (
          <img className="characterPic" src={require('./chars/yoshichar.png')} />
        );
        case 'zelda': return (
          <img className="characterPic" src={require('./chars/zeldachar.png')} />
        );
      }
    }
  }


export default Game;
