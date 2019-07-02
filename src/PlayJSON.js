import Tone from 'tone';

export function JSONtoAudio(json, synth) {
  function triggerSynth(note) {
	   return (time) => synth.triggerAttackRelease(noteToString(note), '8n')
  }
  var currentTime = 0.0
  json.notes.forEach((note) => {
    Tone.Transport.schedule(triggerSynth(note.relative_value), parseFloat((note.duration + currentTime) * Tone.Time('1m')))
    currentTime += note.duration
  })
}

function noteToString(note) {
  console.log(notes[note])
  return notes[note]
}

let notes = {
  '-1': "C4",
  '-2' : "D4",
  '-3' : "E4",
  '-4' : "F4",
  '-5' : "G4",
  '-6' : "A4",
  '-7' : "B4",
  1 : "C5",
  2 : "D5",
  3 : "E5",
  4 : "F5",
  5 : "G5",
  6 : "A5",
  7 : "B5",
  8 : "C6"
}
