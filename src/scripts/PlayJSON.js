import Tone from 'tone';

export function JSONtoAudio(notes, synth) {
  function triggerSynth(note) {
	   return (time) => synth.triggerAttackRelease(noteToString(note), '8n')
  }
  var currentTime = 0.0
  notes.forEach((note) => {
    Tone.Transport.schedule(triggerSynth(note.relative_value), parseFloat((currentTime) * Tone.Time('1m')))
    currentTime += note.duration
  })
}

export function PlayJSON(notes) {
  var synth = new Tone.Synth().toMaster();
  JSONtoAudio(notes, synth);
  Tone.Transport.toggle();
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
