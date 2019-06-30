import React, { Component } from 'react';
import MyComponent from './MyComponent'
import { JSONtoAudio } from './PlayJSON';
import Tone from 'tone';
import Slider from './Slider';
import SheetMusic from './SheetMusic'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songdata: {notes: []}
    };
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
      })

      //create a synth and connect it to the master output (your speakers)

  }
  // {JSON.stringify(this.state.songdata)}
  // <Slider keyId={1} width={window.innerWidth} fill={'green'}/>
  render() {
    return  <div className="App">
    <SheetMusic
    keyId={2}
    width={window.innerWidth - (10 * 2)}
    height={window.innerHeight/2}
    json={this.state.songdata}/>
    </div>;
  }
}

export default App;
