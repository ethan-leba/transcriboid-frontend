import React from 'react';
import { Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage.js'
import StartPage from './pages/StartPage.js'
import ComparePage from './pages/ComparePage.js'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/compare" component={ComparePage} />
      </Switch>
    )
  }
}

export default App;
