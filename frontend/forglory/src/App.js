import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Rankings from './Rankings';
import Game from './Game';
import GameList from './GameList';
import Player from './Player';

const App = () => (
  <Switch>
    <Route exact path='/' component={GameList}/>
    <Route exact path='/game/:string' component={Game}/>
    <Route path='/rankings' component={Rankings}/>
    <Route path='/user/:string' component={Player}/>
  </Switch>
)

export default App
