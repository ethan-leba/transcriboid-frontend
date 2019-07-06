import React from 'react';
import { JSONtoAudio } from '../scripts/PlayJSON';
import Tone from 'tone';
import SheetMusic from '../components/SheetMusic'
import Button from '../components/Button'

class MainPage extends React.Component {
  state = {
      songdata: {notes: []}
  }


  componentDidMount() {
    const myHeaders = new Headers({
      Accept: "application/json"
    });
    var song = null;
    fetch("http://127.0.0.1:5000/song", {
      headers: myHeaders
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(songdata => {
        console.log(songdata);
        song = songdata
        this.setState({ songdata });
      }).then(songdata => {
        var synth = new Tone.Synth().toMaster();
        JSONtoAudio(this.state.songdata, synth)
        Tone.Transport.toggle()
        //this.addNote({relative_value: 3, duration: 1})
      })

      //create a synth and connect it to the master output (your speakers)

  }

  addNote = (note) => {
    // this.state.songdata.notes.push(note)
    // NOTE: outside scope??
    this.setState({
      songdata: {notes: this.state.songdata.notes.concat(note)}
    })
  }
  // {JSON.stringify(this.state.songdata)}
  // <Slider keyId={1} width={window.innerWidth} fill={'green'}/>
  render() {
    return  <div className="App">
    <SheetMusic
    keyId={2}
    width={window.innerWidth - (10 * 2)}
    height={window.innerHeight/2}
    marginX={30}
    addNote={this.addNote}
    json={this.state.songdata}/>
    <Button />
    </div>;
  }
}

export default MainPage;
