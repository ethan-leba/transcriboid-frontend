import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { EmitterProvider, Emitter } from 'react-emitter'

import { isMobile } from './scripts/MobileDetect.js'

import MainPage from './pages/MainPage.js'
import UnsupportedDevicePage from './pages/UnsupportedDevicePage.js'
import StartPage from './pages/StartPage.js'
import ComparePage from './pages/ComparePage.js'
import PropsRoute from './scripts/RouterHelper'

class App extends React.Component {
  state = {
    post_object: [],
    has_post: false
  }

  // Sets the JSON to be posted in the compare page
  setPost = song => {
    this.setState ({
      post_object: song,
      has_post: true
    })
  }


  // Returns the post object and then clears it from the state
  popPost = () => {
    const tmp = this.state.post_object
    this.setState({
      post_object: [],
      has_post: false
    })
    return tmp
  }

  // Checks if there is data available to be popped
  hasPost = () => {
    return this.state.has_post
  }

  render() {
    if (isMobile()) {
      return <UnsupportedDevicePage />
    }
    return (
      <Switch>
        <Route exact path="/" component={StartPage} />
        <PropsRoute path="/main" component={MainPage} setPost ={this.setPost} />
        <PropsRoute path="/compare" component={ComparePage} popPost={this.popPost} hasPost={this.hasPost} />
      </Switch>
    )
  }
}

const EmitterApp = Emitter(( {emit} ) => {
  return <App />;
})


export default EmitterProvider(EmitterApp);
