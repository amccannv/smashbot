import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Rankings from './Rankings';
import Game from './Game';
import GameList from './GameList';

const App = () => (
  <Switch>
    <Route exact path='/' component={GameList}/>
    <Route exact path='/game/:number' component={Game}/>
    <Route path='/rankings' component={Rankings}/>
  </Switch>
)

export default App
