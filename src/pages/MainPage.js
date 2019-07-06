import React from "react";
import {JSONtoAudio} from "../scripts/PlayJSON";
import Tone from "tone";
import SheetMusic from "../components/SheetMusic";
import Button from "../components/Button";

class MainPage extends React.Component {
  state = {
    loading: true,
    songdata: {notes: []}
  };

  componentDidMount() {
    const myHeaders = new Headers({
      Accept: "application/json"
    });
    fetch("http://127.0.0.1:5000/song", {
      headers: myHeaders
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(songdata => {
        console.log(songdata);
        this.setState({songdata});
      })
      .then(songdata => {
        var synth = new Tone.Synth().toMaster();
        JSONtoAudio(this.state.songdata, synth);
        Tone.Transport.toggle();
        this.setState({
          loading: false
        });
      });
    //create a synth and connect it to the master output (your speakers)
  }

  addNote = note => {
    this.setState({
      songdata: {notes: this.state.songdata.notes.concat(note)}
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
          notes={this.state.songdata.notes}
        />
        <Button />
      </div>
    );
  }
}

export default MainPage;
