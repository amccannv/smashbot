import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Game from './Game'
import Rankings from './Rankings'

const Main = () => (
    <Switch>
      <Route path='/' component={Game}/>
      <Route path='/rankings' component={Rankings}/>
    </Switch>
)

export default Main
