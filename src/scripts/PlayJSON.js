import Tone from 'tone';

// Takes in JSON representing a linear list of notes and plays them in order
export function PlayJSON(notes, callback=() => {}) {
  var synth = new Tone.Synth().toMaster();
  Tone.Transport.emit("stop");
  Tone.Transport.stop();
  Tone.Transport.clear();
  JSONtoAudio(notes, synth, callback);
  Tone.Transport.start();
}

function JSONtoAudio(notes, synth, callback) {
  function triggerSynth(note) {
	   return (time) => synth.triggerAttackRelease(noteToString(note), '8n')
  }
  var currentTime = 0.0
  Tone.Transport.once("stop", callback);
  notes.forEach((note) => {
    Tone.Transport.scheduleOnce(triggerSynth(note.relative_value), parseFloat((currentTime) * Tone.Time('1m')))
    currentTime += note.duration
  })
  Tone.Transport.emit("stop");
}

function noteToString(note) {
  console.log(notes[note])
  return notes[note]
}

let notes = {
  '-7': "C4",
  '-6' : "D4",
  '-5' : "E4",
  '-4' : "F4",
  '-3' : "G4",
  '-2' : "A4",
  '-1' : "B4",
  0 : "C5",
  1 : "D5",
  2 : "E5",
  3 : "F5",
  4 : "G5",
  5 : "A5",
  6 : "B5",
  7 : "C6"
}
