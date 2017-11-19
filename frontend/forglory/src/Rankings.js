import React, { Component } from 'react';
import './Rankings.css';

class Rankings extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        data: [
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
          {
            rank: 1, name: 'Andrew McCann', wins: 10, losses: 1, score: 1280,
          },
        ]
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
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
            <div className="rankTable">
              <table class="table-fill">
                <thead>
                <tr>
                <th class="text-left">Rank</th>
                <th class="text-left">Name</th>
                <th class="text-left">Main</th>
                <th class="text-left">W</th>
                <th class="text-left">L</th>
                <th class="text-left">Score</th>
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
        <td class="text-left">{ props.data.rank }</td>
        <td class="text-left">
          <img className="profilePicture" src={require('./testProfile.png')} />
          { props.data.name }
        </td>
        <td class="text-center">
          <img className="mainIcon" src={require('./chars/falco.png')} />
        </td>
        <td class="text-left">{ props.data.wins }</td>
        <td class="text-left">{ props.data.losses }</td>
        <td class="text-left">{ props.data.score }</td>
      </tr>
    );
  }

export default Rankings;
