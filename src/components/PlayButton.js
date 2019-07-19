import React from 'react';
import PropTypes from "prop-types";
import {Emitter} from 'react-emitter'
import {PlayJSON, StopJSON} from "../scripts/PlayJSON";

// The component used to play audio with
class PlayButton extends React.Component {
  state = {
    playing: false
  }

  componentDidMount() {
    this.listener = this.props.addListener('stop', () => {
      this.setState({
        playing: false
      })
    })
  }

  play = () => {
    this.props.emit('stop')
    this.setState({
      playing: true
    })
    PlayJSON(this.props.music, () => {this.setState({playing: false})})
  }

  stop = () => {
    this.props.emit('stop')
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

export const EmitterPlayButton = Emitter(PlayButton)

export default PlayButton
