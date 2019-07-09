import React from "react";
import {PlayJSON} from "../scripts/PlayJSON";
import Tone from "tone";
import SheetMusic from "../components/SheetMusic";
import Button from "../components/Button";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {
  // TODO: Comment
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
    fetch("http://127.0.0.1:5000/song", {
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

  submit = () => {
    this.props.setPost({
       user: this.state.user_song,
      actual: this.state.actual_song
     })
    this.setState({
      redirect: true
    })
  }

// TODO: change play back
  render() {
    if(this.state.redirect) {
      return <Redirect to='/compare' />;
    }
    return this.state.loading ? (
      <p> loading </p>
    ) : (
      <div className="App">
        <SheetMusic
          keyId={1}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={30}
          addNote={this.addNote}
          notes={this.state.user_song}
        />
        <button onClick={() => this.setDuration(0.125)}>8th note</button>
        <button onClick={() => this.setDuration(0.25)}>quarter</button>
        <button onClick={() => this.setDuration(0.5)}>half</button>
        <button onClick={() => this.setDuration(1)}>whole</button>
        <button onClick={this.undo}>undo</button>
        <button onClick={() => PlayJSON(this.state.user_song)}>play</button>
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MainPage;
