import React, { Component } from 'react';
import './GameList.css';

class GameList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        data: [
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
          {
            gameID: 1, playerOne: 'Andrew McCann', playerOneScore: 3, playerTwo: 'Justin Jeong', playerTwoScore: 2,
          },
        ]
      };
    }

    componentWillMount() {

    }

    render() {
      let rows = this.state.data.map(person => {
        return <PersonRow key = {
          person.id
        }
        data = {
          person
        }
        />
      })
      return (
        <div className="body">
          <div class="topnav" id="myTopnav">
            <div className = 'logo' href="#home">
              <img className='logoPicture' src={require('./forglory.png')} />
            </div>
            <div className='linksNav'>
              <a href="/rankings">Rankings</a>
              <a href="/">Games</a>
            </div>
          </div>
          <div className="rankBody">
            <div className="gameTable">
              <table class="table-fill">
                <thead>
                <tr>
                <th class="text-left">GameID</th>
                <th class="text-left">Player One</th>
                <th class="text-left">Score</th>
                <th class="text-left">Player Two</th>
                </tr>
                </thead>
                <tbody class="table-hover">
                  { rows }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }

  const PersonRow = (props) => {
    return (
      <tr>
        <td class="text-left">
          <a href={"/game/" + parseInt(props.data.gameID, 10)}>{ props.data.gameID }</a>
        </td>
        <td class="text-left">
          { props.data.playerOne }
          <img className="mainPicture" src={require('./chars/falco.png')} />
        </td>
        <td class="text-center">
          { props.data.playerOneScore } - { props.data.playerTwoScore}
        </td>
        <td class="text-left">
          { props.data.playerTwo }
          <img className="mainPicture" src={require('./chars/falco.png')} />
        </td>
      </tr>
    );
  }

export default GameList;
