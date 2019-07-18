import React from "react";
import {Link} from "react-router-dom";

import Button from "../components/Button";
import "./Page.css";
import "./StartPage.css";

// The initial page that the user sees when they load the website
class StartPage extends React.Component {
  render() {
    return (
      <div id="main">
          <div>
          <h1>Transcriboid</h1>
          <p className="no-margin">A randomly generated transcription trainer.</p>
          </div>
          <Link to="/main">
            <button className="large">START</button>
          </Link>
        <p className="madetag">Made by Ethan Leba, 2019</p>
      </div>
    );
  }
}

export default StartPage;
