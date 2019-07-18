import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button'
import './Page.css'
import './StartPage.css'

// The initial page that the user sees when they load the website
class StartPage extends React.Component {
  render() {
    return (
      <div id="main">
      <div className="main-item">
      <h1>Transcriboid</h1>
      <p className="main-item">A procedurally generated transcription app</p>
      <div></div>
      <Link to="/main">
      <button className="large">
      START
      </button>
      </Link>
      </div>
      </div>
    )
  }
}

//      <Link to="/main">

export default StartPage;
