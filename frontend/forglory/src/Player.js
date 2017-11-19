import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dataLoaded: false,
        playerName: props.match.params.string,
        playerOneID: '',
        playerRealName: 'PPMD',
        playerWins: 1,
        playerLosses: 3,
        playerELO: 1280,
        playerChar: 'zelda',
        playerRank: 1,
      };
    }

    update(responseJson) {
      document.title = 'For Glory';
      this.setState({
        dataLoaded: true,
        playerName: responseJson.name,
        playerOneID: responseJson.id,
        playerRealName: responseJson.real_name,
        playerWins: responseJson.wins,
        playerLosses: responseJson.losses,
        playerELO: responseJson.elo,
        playerChar: responseJson.main,
        playerRank: responseJson.rank,
        image: responseJson.image,
      });
    }

    componentWillMount() {
      let url = 'http://api.forglory.net/user/' + this.state.playerName;
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
      if(!this.state.dataLoaded) {
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
        )
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
            <div className='userBody'>
              <div className='userProfile'>
                <div className='userContainer'>
                  <div className='leftPlayer'>
                    <div className='upperRow'>
                      <div className='rankButton'>
                        <h4 className='vsText'>Rank</h4>
                        <h1 className='vsText'>{this.state.playerRank}</h1>
                      </div>
                      <h1 className='personName'>{this.state.playerRealName}</h1>
                    </div>
                    <img className="profilePicturePlayer" src={this.state.image} />
                    {this.getChar(this.state.playerChar)}
                  </div>
                  <div className='rightPlayer'>
                    <h1 className='personName'>Wins: {this.state.playerWins}</h1>
                    <h1 className='personName'>Losses: {this.state.playerLosses}</h1>
                    <h1 className='personName'>ELO: {this.state.playerELO}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
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

export default Player;
