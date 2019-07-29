import React from "react";
import Tone from "tone";
import axios from "axios";

import SheetMusic from "../components/SheetMusic";
import {Redirect} from "react-router-dom";
import {EmitPlayButton} from "../components/PlayButton"
import {LoadingDisplay} from "../components/LoadingDisplay"
import "./MainPage.css";

// The main page where the user listens to the song and attempts to transcribe it.
class MainPage extends React.Component {
  /*
    loading: whether the data is still being fetched from the server
    first_time: whether this is the first time the user has used this page
    redirect: whether the page should redirect to comparison
    actual_song: the song that the user is transcribing
    user_song: the user's inputted song
    selected_duration: what the currently selected note duration is
  */
  state = {
    loading: true,
    first_time: false,
    redirect: false,
    actual_song: [],
    user_song: [],
    selected_duration: 0.25
  };

  // calls the python API
  componentDidMount() {
    axios.get("/api/get")
      .then(response => {
        return JSON.parse(response.data)
      })
      .then(songdata => {
        this.setState({
          actual_song: songdata.notes,
          user_song: [songdata.notes[0]],
          loading: false
        });
      });
      if(localStorage.getItem("first_time") === null) {
        localStorage.setItem("first_time", false)
        this.setState({
          first_time: true
        })
      }
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
      return <LoadingDisplay/>;
    }
    return (
      <div className="pt-3">
        <div className="flexbar mt-3 mb-2">
          <h2 className="font-weight-bold m-0">Transcriboid</h2>
          <div className="d-flex align-items-end">
            {this.state.first_time && <p className="my-0 mx-2 text-muted font-weight-bold">click here to play the song.</p>}
            <EmitPlayButton music={this.state.actual_song} />
          </div>
        </div>
        <SheetMusic
          keyId={1}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={40}
          addNote={this.addNote}
          notes={this.state.user_song}
          selectedDuration={this.state.selected_duration}
        />
      <div className="flexbar my-2">
          <div>
            <button className="medium thin" onClick={() => this.setDuration(0.125)}>Eighth</button>
            <button className="medium thin" onClick={() => this.setDuration(0.25)}>Quarter</button>
            <button className="medium thin" onClick={() => this.setDuration(0.5)}>Half</button>
            <button className="medium thin" onClick={() => this.setDuration(1)}>Whole</button>
          </div>
          <div>
            <button className="medium thin red" onClick={this.undo}>
              Undo
            </button>
            <button className="medium thin red" onClick={this.submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
