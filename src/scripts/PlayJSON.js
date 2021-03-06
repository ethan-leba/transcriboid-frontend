import Tone from "tone";

// Takes in JSON representing a linear list of notes and plays them in order
export function PlayJSON(notes, callback = () => {}) {
  var synth = new Tone.Synth().toMaster();
  Tone.Transport.stop();
  Tone.Transport.cancel();
  JSONtoAudio(notes, synth, callback);
  Tone.Transport.start();
}

// Stops the song from playing
export function StopJSON() {
  Tone.Transport.stop();
}

// Converts the JSON into a series of Tone events
function JSONtoAudio(notes, synth, callback) {
  function triggerSynth(note) {
    return time => synth.triggerAttackRelease(noteToString(note), "8n");
  }
  var currentTime = 0.0;
  notes.forEach(note => {
    Tone.Transport.scheduleOnce(
      triggerSynth(note.relative_value),
      parseFloat(currentTime * Tone.Time("1m"))
    );
    currentTime += note.duration;
  });
  Tone.Transport.scheduleOnce(
    callback,
    parseFloat(currentTime * Tone.Time("1m"))
  );
}

// Converts a note to it's string representation
function noteToString(note) {
  return notes[note];
}

// The note dictionary
let notes = {
  "-7": "C4",
  "-6": "D4",
  "-5": "E4",
  "-4": "F4",
  "-3": "G4",
  "-2": "A4",
  "-1": "B4",
  0: "C5",
  1: "D5",
  2: "E5",
  3: "F5",
  4: "G5",
  5: "A5",
  6: "B5",
  7: "C6"
};
