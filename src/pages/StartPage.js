import React from "react";
import {Link} from "react-router-dom";

import "./Page.css";
import "./StartPage.css";

// The initial page that the user sees when they load the website
class StartPage extends React.Component {
  render() {
    return (
      <div id="main">
          <div>
          <h1 className="font-weight-bold">Transcriboid</h1>
          <p className="m-0 text-center font-weight-normal">A randomly generated transcription trainer.</p>
          </div>
          <Link to="/main">
            <button className="large">Start</button>
          </Link>
        <p className="madetag">Made by Ethan Leba, 2019</p>
      </div>
    );
  }
}

export default StartPage;
