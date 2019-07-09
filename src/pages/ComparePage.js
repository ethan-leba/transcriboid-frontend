import React from 'react';
import SheetMusic from '../components/SheetMusic'
import axios from 'axios';

class ComparePage extends React.Component {
  state = {
      actual_song : [],
      corrected_song: []
  }

  componentDidMount() {
    //Sends in the data to check if the user input is correct
      axios
        .post("/submit", this.props.popPost())
        .then((response) => {
          this.setState({
            actual_song: response.data.actual,
            corrected_song: response.data.corrected,
          })
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  render() {
    return (
      <div className="App">
        <SheetMusic
          keyId={1}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={30}
          addNote={this.addNote}
          notes={this.state.actual_song}
        />
        <SheetMusic
          keyId={2}
          width={window.innerWidth - 10 * 2}
          height={window.innerHeight / 2}
          marginX={30}
          addNote={this.addNote}
          notes={this.state.corrected_song}
        />
        </div>
    )
  }
}

export default ComparePage;
