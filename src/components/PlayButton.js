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
    if(this.props.playOnLoad) {
      this.play()
    }
  }

  play = () => {
    this.emitStop();
    this.setState({
      playing: true
    })
    PlayJSON(this.props.music, () => {this.emitStop()})
  }

  stop = () => {
    this.emitStop();
    StopJSON();
  }

  emitStop = () => {
    this.props.emit('stop')
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
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  playOnLoad: PropTypes.bool
}

PlayButton.defaultProps = {
  playOnLoad: false
}

export const EmitPlayButton = Emitter(PlayButton)

export default Emitter(PlayButton)
