import React, { Component } from 'react';
import './Rankings.css';

class Rankings extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: []
      };
    }

    update(responseJson) {
      document.title = 'For Glory';
      this.setState({
        data: responseJson
      });
      console.log(responseJson);
    }

    componentWillMount() {
      let url = 'http://api.forglory.net/ranking';
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
      let rows = this.state.data.map(person => {
        return <PersonRow key = {
          person.id
        }
        data = {
          person
        }
        />
      })
      if(this.state.data.length === 0) {
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
          </div>
        );
      }
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

  const getChar = (name) => {
    switch (name) {
      case 'bowser': return (
        <img className="mainPicture" src={require('./chars/bowser.png')} />
      );
      case 'dk': return (
        <img className="mainPicture" src={require('./chars/dk.png')} />
      );
      case 'doc': return (
        <img className="mainPicture" src={require('./chars/doc.png')} />
      );
      case 'falco': return (
        <img className="mainPicture" src={require('./chars/falco.png')} />
      );
      case 'falcon': return (
        <img className="mainPicture" src={require('./chars/falcon.png')} />
      );
      case 'fox': return (
        <img className="mainPicture" src={require('./chars/fox.png')} />
      );
      case 'gw': return (
        <img className="mainPicture" src={require('./chars/gw.png')} />
      );
      case 'ics': return (
        <img className="mainPicture" src={require('./chars/ics.png')} />
      );
      case 'kirby': return (
        <img className="mainPicture" src={require('./chars/kirby.png')} />
      );
      case 'link': return (
        <img className="mainPicture" src={require('./chars/link.png')} />
      );
      case 'luigi': return (
        <img className="mainPicture" src={require('./chars/luigi.png')} />
      );
      case 'mario': return (
        <img className="mainPicture" src={require('./chars/mario.png')} />
      );
      case 'marth': return (
        <img className="mainPicture" src={require('./chars/marth.png')} />
      );
      case 'mewtwo': return (
        <img className="mainPicture" src={require('./chars/mewtwo.png')} />
      );
      case 'ness': return (
        <img className="mainPicture" src={require('./chars/ness.png')} />
      );
      case 'peach': return (
        <img className="mainPicture" src={require('./chars/peach.png')} />
      );
      case 'pichu': return (
        <img className="mainPicture" src={require('./chars/pichu.png')} />
      );
      case 'pikachu': return (
        <img className="mainPicture" src={require('./chars/pikachu.png')} />
      );
      case 'puff': return (
        <img className="mainPicture" src={require('./chars/puff.png')} />
      );
      case 'samus': return (
        <img className="mainPicture" src={require('./chars/samus.png')} />
      );
      case 'sheik': return (
        <img className="mainPicture" src={require('./chars/sheik.png')} />
      );
      case 'ylink': return (
        <img className="mainPicture" src={require('./chars/ylink.png')} />
      );
      case 'yoshi': return (
        <img className="mainPicture" src={require('./chars/yoshi.png')} />
      );
      case 'zelda': return (
        <img className="mainPicture" src={require('./chars/zelda.png')} />
      );
    }
  }

  const PersonRow = (props) => {
    return (
      <tr>
        <td class="text-left">{ props.data.rank }</td>
        <td class="text-left">
          <img className="profilePicture" src={props.data.image} />
          <a href={"/user/" + props.data.name}>{ props.data.real_name }</a>
        </td>
        <td class="text-center">
          {getChar(props.data.main)}
        </td>
        <td class="text-left">{ props.data.wins }</td>
        <td class="text-left">{ props.data.losses }</td>
        <td class="text-left">{ props.data.elo }</td>
      </tr>
    );
  }

export default Rankings;
