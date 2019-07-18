import React from 'react';
import PropTypes from "prop-types";

import {PlayJSON} from "../scripts/PlayJSON";

class PlayButton extends React.Component {
  state = {
    playing: false;
  }
  render() {
    return (
      <button className="red" onClick={() => PlayJSON(this.state.corrected_song)}>
        Play
      </button>
    )
  }
}

PlayButton.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PlayButton
