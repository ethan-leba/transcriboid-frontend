import Tone from 'tone';

export function JSONtoAudio(json, synth) {
  function triggerSynth(note) {
	   return (time) => synth.triggerAttackRelease(noteToString(note), '8n')
  }
  var currentTime = 0.0
  json.notes.forEach((note) => {
    Tone.Transport.schedule(triggerSynth(note.relative_value + json.key_offset), parseFloat((note.duration + currentTime) * Tone.Time('1m')))
    currentTime += note.duration
  })
}

function noteToString(note) {
  var octave = Math.floor(note/12)
  console.log(notes[note % 12] + octave.toString())
  return notes[note % 12] + octave.toString()
}

//TODO: Notes are from C but json is from A

let notes = {
  0 : "C",
  1 : "C#",
  2 : "D",
  3 : "D#",
  4 : "E",
  5 : "F",
  6 : "F#",
  7 : "G",
  8 : "G#",
  9 : "A",
  10 : "A#",
  11 : "B"
}
