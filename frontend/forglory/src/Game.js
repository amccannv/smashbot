import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        gameID: parseInt(props.match.params.number, 10),
        gameFinished: true,
        playerOneID: 0,
        playerOneName: 'PPMD',
        playerOneRank: 1,
        playerOneScore: 3,
        playerOneChar: 'Fox',
        playerTwoID: 0,
        playerTwoName: 'Mang0',
        playerTwoRank: 2,
        playerTwoScore: 2,
        playerTwoChar: 'Fox',
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div className="landingContainer">
          <div class="topnav" id="myTopnav">
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
                    <img className="profilePictureGame" src={require('./testProfile.png')} />
                    <div className='playerInfo'>
                      <h1>{this.state.playerOneName}</h1>
                      <h3>Rank #{this.state.playerOneRank}</h3>
                    </div>
                  </div>
                  <div className='score'>{this.state.playerOneScore}</div>
                  <img className="characterPic" src={require('./chars/ylinkchar.png')} />
                </div>
                <div className='divider' />
                <div className='versus'>
                  <h1 className='vsText'>VS</h1>
                </div>
                <div className='rightPlayer'>
                  <div className='rightProfileContainer'>
                    <img className="profilePictureGame" src={require('./testProfile.png')} />
                    <div className='playerInfo'>
                      <h1>{this.state.playerTwoName}</h1>
                      <h3>Rank #{this.state.playerTwoRank}</h3>
                    </div>
                  </div>
                  <div className='score'>{this.state.playerTwoScore}</div>
                  <img className="characterPic" src={require('./chars/falcochar.png')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

export default Game;
