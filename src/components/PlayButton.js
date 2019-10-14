import React from "react";
import PropTypes from "prop-types";
import { Emitter } from "react-emitter";
import { PlayJSON, StopJSON } from "../scripts/PlayJSON";

// The component used to play audio with
// This component uses Emitters as attempting to use a different PlayButton
// will stop any PlayButtons currently in use
class PlayButton extends React.Component {
  state = {
    // Whether this button's song is currently playing
    playing: false
  };

  componentDidMount() {
    // Adds a listener for the 'stop' event, which when triggered pauses all other songs
    this.listener = this.props.addListener("stop", () => {
      this.setState({
        playing: false
      });
    });
    if (this.props.playOnLoad) {
      this.play();
    }
  }

  // Plays the song
  play = () => {
    this.emitStop();
    this.setState({
      playing: true
    });
    PlayJSON(this.props.music, () => {
      this.emitStop();
    });
  };

  // Stops the current song
  stop = () => {
    this.emitStop();
    StopJSON();
  };

  // Sends a signal to stop all other buttons
  emitStop = () => {
    this.props.emit("stop");
  };

  render() {
    return (
      <button
        className="red"
        onClick={this.state.playing ? this.stop : this.play}
      >
        {this.state.playing ? "Pause" : "Play"}
      </button>
    );
  }
}

PlayButton.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  playOnLoad: PropTypes.bool
};

PlayButton.defaultProps = {
  playOnLoad: false
};

export const EmitPlayButton = Emitter(PlayButton);

export default Emitter(PlayButton);
