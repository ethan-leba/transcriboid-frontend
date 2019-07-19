import React from "react";
import Tone from "tone";

import {PlayJSON} from "../scripts/PlayJSON";
import SheetMusic from "../components/SheetMusic";
//import Button from "../components/Button";
import {Redirect} from "react-router-dom";
import {EmitPlayButton} from "../components/PlayButton"
import "./MainPage.css";

// The main page where the user listens to the song and attempts to transcribe it.
class MainPage extends React.Component {
  /*
    loading: whether the data is still being fetched from the server
    redirect: whether the page should redirect to comparison
    actual_song: the song that the user is transcribing
    user_song: the user's inputted song
    selected_duration: what the currently selected note duration is
  */
  state = {
    loading: true,
    redirect: false,
    actual_song: [],
    user_song: [],
    selected_duration: 0.25
  };

  componentDidMount() {
    const myHeaders = new Headers({
      Accept: "application/json"
    });
    fetch("http://127.0.0.1:5000/api/get", {
      headers: myHeaders
    })
      .then(response => {
        return response.json();
      })
      .then(songdata => {
        this.setState({
          actual_song: songdata.notes,
          user_song: [songdata.notes[0]],
          loading: false
        });
      });
  }

  // Adds the note to the user_song state given the relative_value supplied by
  // SheetMusic and the preselected duration
  addNote = noteval => {
    this.setState({
      user_song: this.state.user_song.concat({
        relative_value: noteval,
        duration: this.state.selected_duration
      })
    });
  };

  // Removes the last element added
  undo = () => {
    this.setState({
      user_song: this.state.user_song.slice(0, -1)
    });
  };

  // Sets the duration
  setDuration = duration => {
    this.setState({
      selected_duration: duration
    });
  };

  // Sets the post data and then redirects the user to the comparison page
  submit = () => {
    this.props.setPost({
      user: this.state.user_song,
      actual: this.state.actual_song
    });
    this.setState({
      redirect: true
    });
    Tone.Transport.stop();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/compare" />;
    }
    if (this.state.loading) {
      return null;
    }
    return (
      <div>
        <div className="flexbar">
          <h2>Actual Transcription</h2>
          <EmitPlayButton music={this.state.actual_song} />
        </div>
        <SheetMusic
          keyId={1}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={30}
          addNote={this.addNote}
          notes={this.state.user_song}
          selectedDuration={this.state.selected_duration}
        />
        <div className="flexbar">
          <div>
            <button function={() => this.setDuration(0.125)}>Eighth</button>
            <button onClick={() => this.setDuration(0.25)}>Quarter</button>
            <button onClick={() => this.setDuration(0.5)}>Half</button>
            <button onClick={() => this.setDuration(1)}>Whole</button>
          </div>
          <div>
            <button className="red" onClick={this.undo}>
              Undo
            </button>
            <button className="red" onClick={this.submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
