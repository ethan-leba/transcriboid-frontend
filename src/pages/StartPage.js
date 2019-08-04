import React from "react";
import {Link} from "react-router-dom";

import "./Page.css";

// The initial page that the user sees when they load the website
class StartPage extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-around align-items-center h-100">
          <div>
          <h1 className="display-2 font-weight-bold">Transcriboid</h1>
          <p className="m-0 text-center font-weight-bold text-muted">A randomly generated transcription trainer.</p>
          </div>
          <Link to="/main">
            <button className="large">Start</button>
          </Link>
        <p className="m-3 fixed-bottom text-right">Made by Ethan Leba, 2019</p>
      </div>
    );
  }
}

export default StartPage;
