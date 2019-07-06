import React from "react";
import {JSONtoAudio} from "../scripts/PlayJSON";
import Tone from "tone";
import SheetMusic from "../components/SheetMusic";
import Button from "../components/Button";

class MainPage extends React.Component {
  state = {
    loading: true,
    actual_song: [],
    user_song: []
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
      })
      .then(songdata => {
        var synth = new Tone.Synth().toMaster();
        JSONtoAudio(this.state.actual_song, synth);
        Tone.Transport.toggle();
      });
    //create a synth and connect it to the master output (your speakers)
  }

  addNote = note => {
    this.setState({
      user_song: this.state.user_song.concat(note)
    });
  };

  render() {
    return this.state.loading ? (
      <p> loading </p>
    ) : (
      <div className="App">
        <SheetMusic
          keyId={2}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={30}
          addNote={this.addNote}
          notes={this.state.user_song}
        />
        <Button />
      </div>
    );
  }
}

export default MainPage;
