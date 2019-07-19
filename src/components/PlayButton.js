import React from 'react';
import PropTypes from "prop-types";

import {PlayJSON, StopJSON} from "../scripts/PlayJSON";

// The component used to play audio with
class PlayButton extends React.Component {
  state = {
    playing: false
  }

  play = () => {
    this.setState({
      playing: true
    })
    PlayJSON(this.props.music, () => {this.setState({playing: false})})
  }

  stop = () => {
    //this.setState({playing: false})
    StopJSON();
  }

  render() {
    return (
      <button className="red" onClick={this.state.playing ? this.stop : this.play}>
        {this.state.playing ? "Pause" : "Play"}
      </button>
    )
  }
}

PlayButton.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PlayButton
